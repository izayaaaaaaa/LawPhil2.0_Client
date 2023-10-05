/**
 * The AdminDashboard component is a React component that manages the state and functionality for an
 * admin dashboard interface.
 * @returns The AdminDashboard component is being returned.
 */

import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/general.css';
import '../../styles/admin.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import LawList from './LawList';

const lawCategories = [
  // feature upgrade: fetch the categories from the database
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

const AdminDashboard = ({ hostUrl }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lawsInCategory, setLawsInCategory] = useState([]);
  const [activeCategoryName, setActiveCategoryName] = useState('');

  const handleCategorySelect = (categoryID) => {
    setSelectedCategory(categoryID);
    console.log(`AdminDashboard Selected category: ${categoryID}`);
  
    // Fetch laws in the selected category (title and subcategory only)
    axios
      .get(`${hostUrl}/LawPhil2.0_Server/lawCRUD/getLawsByCategory.php?category=${categoryID}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setLawsInCategory(response.data);
          setActiveCategoryName(lawCategories.find((category) => category.id === categoryID)?.name || '');
        } else {
          throw new Error(`Failed to fetch laws for category ${categoryID}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container AdminDashboard">      
      
      <div className="row rowOne">
        <div className="col-md-10">
          <h2 className="">Admin Dashboard</h2>
        </div>
        
        <div className="col-md-2">
          <button type="button" className="btn btn-link">
            <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
            Add New Law
          </button>
        </div>
      </div>

      <div className="row my-3">
        <hr />
      </div>

      <div className="row rowTwo">
        <div className="col-md-3">
          <Sidebar
            categories={lawCategories} 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
          <div className="col-md-9">
            <LawList laws={lawsInCategory} activeCategoryName={activeCategoryName} hostUrl={hostUrl} />
          </div>
      </div>

    </div>
  );
};

export default AdminDashboard;