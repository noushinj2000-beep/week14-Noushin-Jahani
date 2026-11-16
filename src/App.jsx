import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  
  const [contacts, setContacts] = useState([
    {
      id: 1,
      firstName: "Sara",
      lastName: "Ahmadi",
      email: "sara@gmail.com"
    },
    {
      id: 2,
      firstName: "Ali",
      lastName: "Rezaei",
      email: "ali@gmail.com"
    }
  ])


  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })


  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);



 
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      alert("لطفاً تمام فیلدها را کامل کنید");
      return;
    }

    setShowSubmitModal(true);
  };
  const confirmSubmit = () => {
  if (editingId !== null) {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === editingId
          ? { ...contact, ...formData }
          : contact
      )
    );

    setEditingId(null);
  } else {
    const newContact = {
      id: Date.now(),
      ...formData
    };

    setContacts(prev => [...prev, newContact]);
  }

  setFormData({
    firstName: "",
    lastName: "",
    email: ""
  });

  setShowSubmitModal(false);
};

  const handleDelete = (id) => {
    setDeleteId(id);
  };
  const confirmDelete = () => {
    setContacts(prev =>
      prev.filter(contact => contact.id !== deleteId)
    );
setSelectedIds(prev =>
  prev.filter(id => id !== deleteId)
);
    setDeleteId(null);
  };


  const handleEdit = (contact) => {
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email
    })

    setEditingId(contact.id)
  }
  const handleCancelEdit = () => {
  setFormData({
    firstName: "",
    lastName: "",
    email: ""
  });

  setEditingId(null);
};
  const handleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  const openBulkDeleteModal = () => {
    if (selectedIds.length > 0) {
      setShowBulkDeleteModal(true);
    }
  };
  const confirmBulkDelete = () => {
    setContacts(prev =>
      prev.filter(contact => !selectedIds.includes(contact.id))
    );

    setSelectedIds([]);
    setShowBulkDeleteModal(false);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main dir="rtl">
      <h1>Contact App</h1>

      <form onSubmit={handleSubmit}>

        <label>
          نام:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          نام خانوادگی:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          ایمیل:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
            title="ایمیل را به شکل sara@gmail.com وارد کنید"
          />
        </label>

        <button type="submit">
          {editingId !== null ? "ذخیره ویرایش" : "افزودن مخاطب"}
        </button>
        {editingId !== null && (
  <button type="button" onClick={handleCancelEdit}>
    انصراف از ویرایش
  </button>
)}
      </form>
      {deleteId !== null && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>تأیید حذف</h3>
            <p>آیا از حذف این مخاطب مطمئن هستید؟</p>

            <button type="button" onClick={confirmDelete}>
              بله، حذف کن
            </button>

            <button
              type="button"
              onClick={() => setDeleteId(null)}
            >
              انصراف
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={openBulkDeleteModal}
        disabled={selectedIds.length === 0}
      >
        حذف مخاطبین انتخاب‌شده ({selectedIds.length})
      </button>
      {showBulkDeleteModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>تأیید حذف گروهی</h3>

            <p>
              آیا از حذف {selectedIds.length} مخاطب انتخاب‌شده مطمئن هستید؟
            </p>

            <button
              type="button"
              onClick={confirmBulkDelete}
            >
              بله، حذف کن
            </button>

            <button
              type="button"
              onClick={() => setShowBulkDeleteModal(false)}
            >
              انصراف
            </button>
          </div>
        </div>
      )}
      <input
        type="text"
        placeholder="جست‌وجوی نام، نام خانوادگی یا ایمیل"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {showSubmitModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>تأیید اطلاعات</h3>

            <p>
              {editingId !== null
                ? "آیا از ذخیره تغییرات مطمئن هستید؟"
                : "آیا اطلاعات مخاطب ثبت شود؟"}
            </p>

            <button type="button" onClick={confirmSubmit}>
              تأیید
            </button>

            <button
              type="button"
              onClick={() => setShowSubmitModal(false)}
            >
              انصراف
            </button>
          </div>
        </div>
      )}
      <ul>
        {filteredContacts.length === 0 && (
          <li>مخاطبی پیدا نشد.</li>
        )}
        {filteredContacts.map(contact => (

          <li key={contact.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.includes(contact.id)}
                onChange={() => handleSelect(contact.id)}
              />

            </label>
            {contact.firstName} {contact.lastName}

            <p>{contact.email}</p>

            <button
              type="button"
              onClick={() => handleEdit(contact)}
            >
              ویرایش
            </button>

            <button
              type="button"
              onClick={() => handleDelete(contact.id)}
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}



export default App
