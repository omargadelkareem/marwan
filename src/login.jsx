// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // ← مهم جدًا (نفس الملف اللي عملناه للـ Admin)

const Login = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const correctPassword = "123456"; // غيريها زي ما تحبي

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      navigate('/admin-secret-2025');
    } else {
      alert('كلمة السر غلط يا ملك');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf2f8, #fce7f3, #f8b4d9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* الكارت الرئيسي */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '60px 50px',
        borderRadius: '40px',
        boxShadow: '0 30px 60px rgba(190, 24, 93, 0.25)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center',
        border: '3px solid #f8b4d9',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* زخرفة وردية في الأعلى */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '15px',
          background: 'linear-gradient(90deg, #ec4899, #db2777, #be185d)',
          borderRadius: '40px 40px 0 0'
        }}></div>

        {/* العنوان */}
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#be185d',
          marginBottom: '20px',
          textShadow: '2px 2px 10px rgba(190, 24, 93, 0.2)'
        }}>
          لوحة التحكم
        </h1>

      

        {/* الفورم */}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="كلمة السر "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '20px',
              fontSize: '1.5rem',
              textAlign: 'center',
              border: '3px solid #f8b4d9',
              borderRadius: '25px',
              background: '#fdf2f8',
              color: '#be185d',
              marginBottom: '30px',
              outline: 'none',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#ec4899';
              e.target.style.boxShadow = '0 0 20px rgba(236, 72, 153, 0.4)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#f8b4d9';
              e.target.style.boxShadow = 'none';
            }}
          />

          <button style={{
            width: '100%',
            padding: '20px',
            background: 'linear-gradient(45deg, #ec4899, #db2777)',
            color: 'white',
            fontSize: '1.6rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            boxShadow: '0 15px 30px rgba(236, 72, 153, 0.4)',
            transition: 'all 0.4s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-8px)';
            e.target.style.boxShadow = '0 25px 50px rgba(236, 72, 153, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 15px 30px rgba(236, 72, 153, 0.4)';
          }}
          >
            دخول 
          </button>
        </form>

        {/* تلميح لطيف */}
       
      </div>
    </div>
  );
};

export default Login;