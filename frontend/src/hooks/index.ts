import { useState } from 'react'

export function useForm(): any {
  const [form, setForm] = useState({})
  function setValue(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return { form, setValue }
}