// NewLawModal component

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const lawCategories = [
  { id: 'Constitutions', name: 'Constitutions' },
  { id: 'Statutes', name: 'Statutes' },
  { id: 'Executive Issuances', name: 'Executive Issuances' },
  { id: 'Judicial Issuances', name: 'Judicial Issuances' },
  { id: 'Other Judicial Issuances', name: 'Other Judicial Issuances' },
  { id: 'Other Issuances', name: 'Other Issuances' },
  { id: 'Jurisprudence', name: 'Jurisprudence' },
  { id: 'International Legal Resources', name: 'International Legal Resources' },
  { id: 'AUSL Exclusive', name: 'AUSL Exclusive' },
];

const NewLawModal = ({ show, handleClose, hostUrl }) => {
  const [lawTitle, setLawTitle] = useState('');
  const [lawCategory, setLawCategory] = useState('');
  const [lawSubcategory, setLawSubcategory] = useState('');
  const [lawContent, setLawContent] = useState('');

  const handleTitleChange = (e) => {
    setLawTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setLawCategory(e.target.value);
  };

  const handleSubcategoryChange = (e) => {
    setLawSubcategory(e.target.value);
  };

  const handleContentChange = (e) => {
    setLawContent(e.target.value);
  };

  const handleSaveClick = () => {
    const lawData = {
      title: lawTitle,
      category: lawCategory,
      subcategory: lawSubcategory,
      content: lawContent
    };

    axios.post(`${hostUrl}/LawPhil2.0_Server/lawCRUD/createLaw.php`, lawData)
      .then((response) => {
    console.log(response.data);
        handleClose();
    })
    .catch((error) => {
    console.error('Error creating a new law:', error);
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" dialogClassName="modal-fullscreen">
      <Modal.Header closeButton>
        <Modal.Title>Create a New Law</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxWidth: '100%', padding: '0'}}>
        <div className="container m-5 px-5">
          <div className="mb-3 row">
            <label htmlFor="lawTitle" className="form-label p-0">Law Title</label>
            <input type="text" className="form-control" id="lawTitle" placeholder="Enter law title here" value={lawTitle} onChange={handleTitleChange} />
          </div>
          <div className="mb-3 row">
            <div className="mb-3 col p-0 me-3">
              <label htmlFor="lawCategory" className="form-label">Law Category</label>
              <select className="form-select" id="lawCategory" value={lawCategory} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                {lawCategories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3 col p-0 ms-3">
              <label htmlFor="lawSubcategory" className="form-label">Law Subcategory</label>
              <input type="text" className="form-control" id="lawSubcategory" placeholder="Enter a subcategory" value={lawSubcategory} onChange={handleSubcategoryChange} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="lawContent" className="form-label p-0">Law Content</label>
            <textarea className="form-control" id="lawContent" rows="12" value={lawContent} onChange={handleContentChange}></textarea>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" className="close-btn" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="secondary" className="save-btn" onClick={handleSaveClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewLawModal;