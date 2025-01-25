import React from 'react';
import './medicinePage.css';


const MedicinePage = () => {
  return (
    <div className="medicine-page">
      <h1 className="medicine-page-title">Ensuring Medicine for All the Affected</h1>
      <div className="medicine-page-content">
        <div className="medicine-page-blog">
          <h2 className="medicine-page-blog-title">Blog Post 1</h2>
          <p className="medicine-page-blog-content">
            The global healthcare community has made significant progress in ensuring access to
            medicine for all individuals, particularly those who are most affected by diseases and
            illnesses. Efforts have been made to develop affordable and accessible treatments,
            establish healthcare systems in underserved areas, and improve the distribution and
            availability of essential medicines.
          </p>
          <img src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Blog Post 1" className="medicine-page-blog-image" />
        </div>

        <div className="medicine-page-blog">
          <h2 className="medicine-page-blog-title">Blog Post 2</h2>
          <p className="medicine-page-blog-content">
            One of the key initiatives in ensuring medicine for all the affected is the promotion
            of generic drugs. Generic medicines provide cost-effective alternatives to branded
            drugs, making them more accessible to individuals from lower-income backgrounds. This
            helps in reducing the financial burden on patients and ensures that essential medicines
            are available to those who need them the most.
          </p>
          <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Blog Post 2" className="medicine-page-blog-image" />
        </div>

        <div className="medicine-page-blog">
          <h2 className="medicine-page-blog-title">Blog Post 3</h2>
          <p className="medicine-page-blog-content">
            Another crucial aspect of ensuring medicine for all is the implementation of
            comprehensive healthcare policies and programs. These policies focus on providing
            healthcare services to vulnerable populations, including children, the elderly, and
            individuals with chronic illnesses. Through such programs, access to medicine is
            enhanced, ensuring that everyone has the opportunity to receive necessary treatments
            and medications.
          </p>
          <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80" alt="Blog Post 3" className="medicine-page-blog-image" />
        </div>
      </div>
    </div>
  );
};

export default MedicinePage;