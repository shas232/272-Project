import React from 'react';
import './BlogContent.css';

const BlogContent = () => (
  <div className="blog-content">
    <h1>Preventing Expense Fraud with AI-Driven Risk Management</h1>
    <p className="update-date">Last updated: September 26, 2024</p>
    <div className="image-placeholder">
      <img src="/path-to-image.jpg" alt="People in discussion" />
    </div>
    
    <section>
      <h2>What is expense fraud—and why should you care?</h2>
      <p>
        Sometimes, humans are chaotic and jot down the wrong numbers. But more often than not, 
        employees commit expense fraud by submitting false or inflated claims on their expense reports,
        typically with the goal of getting reimbursed for non-business-related or exaggerated costs.
      </p>
      <ul>
        <li><strong>Mischaracterized expenses:</strong> Personal purchases claimed as business-related.</li>
        <li><strong>Exaggerated expenses:</strong> Inflated legitimate expenses.</li>
        <li><strong>Duplicate expenses:</strong> The same expense is submitted more than once.</li>
        <li><strong>Fictitious expenses:</strong> Claims for expenses that never occurred, like submitting a family meal as a client dinner.</li>
      </ul>
    </section>

    <section>
      <h2>Challenges in traditional fraud detection</h2>
      <p>Traditionally, manual expense fraud detection presents several obstacles for companies. Let’s take a look at some of the key challenges organizations face when trying to prevent expense fraud:</p>
      <ul>
        <li><strong>Detection at scale is difficult:</strong> Manually reviewing hundreds of expense reports is time-consuming and prone to errors, especially for large volumes of data.</li>
        <li><strong>Increasing fraud sophistication:</strong> Fraudsters constantly find new ways to bypass traditional detection methods, such as spreading fake expenses across reports or using realistic fake receipts.</li>
        <li><strong>Hard to detect across different channels:</strong> Businesses use multiple channels for submitting expense claims, making it harder to track and verify datasets in real-time.</li>
        <li><strong>Difficulty in customizing to company guidelines:</strong> Each company has unique expense policies, but outdated fraud detection systems often struggle to adapt.</li>
        <li><strong>Juggling multiple software solutions:</strong> Fragmented tools for managing expenses and detecting fraud lead to inefficiency and increased risk of errors.</li>
      </ul>
    </section>
  </div>
);

export default BlogContent;
