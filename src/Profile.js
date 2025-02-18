// src/Profile.js
import React from 'react';

function Profile({ user }) {
  return (
    <section style={styles.container}>
      <h2>Your Profile</h2>
      <p>Email: {user.email}</p>
      {/* You can expand this section with more user-specific info */}
    </section>
  );
}

const styles = {
  container: {
    marginBottom: '2rem',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  }
};

export default Profile;
