// src/Profile.js
import React from 'react';

function Profile({ user }) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2>Your Profile</h2>
      <p>Email: {user.email}</p>
      {/* You can add more details here, such as recycling history or achievements */}
    </section>
  );
}

export default Profile;
