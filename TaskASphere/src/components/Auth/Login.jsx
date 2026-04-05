import React, { useState } from 'react'

const Login = ({ handleLogin, toggleView }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMSG, setErrorMSG] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    const success = handleLogin(email, password)

    if (success) {
      setEmail('')
      setPassword('')
      setErrorMSG('')
    } else {
      setErrorMSG("Incorrect credentials.")
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="w-[380px] p-10 rounded-2xl bg-card border border-main shadow-2xl flex flex-col gap-6 animate-fade-in"
    >

      <div className="text-center mb-2">
        <h2 className="text-3xl font-black text-main drop-shadow-sm tracking-tight">
          Welcome Back
        </h2>
        <p className="text-sm text-emerald-500 font-bold mt-2 uppercase tracking-widest">Employee Portal</p>
      </div>

      {errorMSG && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-center text-xs font-bold animate-fade-in shadow-inner">
          {errorMSG} <button type="button" onClick={toggleView} className="underline decoration-red-500/50 hover:text-red-400 ml-1 transition-colors">Sign Up Instead?</button>
        </div>
      )}

      <input
        type="email"
        placeholder="Work Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-4 py-3 rounded-lg bg-transparent text-main placeholder-gray-500 border border-main focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="px-4 py-3 rounded-lg bg-transparent text-main placeholder-gray-500 border border-main focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
      />

      <button
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 py-3 rounded-xl text-white font-black uppercase tracking-widest shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 active:scale-95"
      >
        LOGIN
      </button>

      <div className="text-center mt-2">
        <p className="text-gray-400 text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={toggleView}
            className="text-emerald-400 font-bold hover:text-white transition-colors underline decoration-emerald-500/30 underline-offset-4"
          >
            Sign Up
          </button>
        </p>
      </div>
    </form>
  )
}

export default Login