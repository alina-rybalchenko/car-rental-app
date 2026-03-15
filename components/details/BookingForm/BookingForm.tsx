'use client';

import { FormEvent, useMemo, useState } from 'react';
import css from './BookingForm.module.css';

type FormState = {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  bookingDate: '',
  comment: '',
};

const sanitizeName = (value: string) => {
  let nextValue = value;

  nextValue = nextValue.replace(/^\s+/, '');
  nextValue = nextValue.replace(/[^A-Za-zА-Яа-яІіЇїЄєҐґ' -]/g, '');
  nextValue = nextValue.replace(/ {2,}/g, ' ');
  nextValue = nextValue.replace(/'{2,}/g, "'");
  nextValue = nextValue.replace(/-{2,}/g, '-');

  return nextValue;
};

export default function BookingForm() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const minDate = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    let nextValue = value;

    if (name === 'name') {
      nextValue = sanitizeName(value);
    }

    if (name === 'email') {
      nextValue = value.replace(/\s/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      bookingDate: formData.bookingDate,
      comment: formData.comment.trim(),
    };

    console.log(cleanedData);

    setIsSubmitted(true);
    setFormData(initialState);
  };

  return (
    <section className={css.section}>
      <div className={css.card}>
        <h2 className={css.title}>Book your car now</h2>

        <p className={css.text}>
          Stay connected! We are always ready to help you.
        </p>

        <form className={css.form} onSubmit={handleSubmit} autoComplete="on">
          <input
            className={css.input}
            type="text"
            name="name"
            placeholder="Name*"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            pattern="^(?=.*[A-Za-zА-Яа-яІіЇїЄєҐґ])[A-Za-zА-Яа-яІіЇїЄєҐґ]+(?:[ '-][A-Za-zА-Яа-яІіЇїЄєҐґ]+)*$"
            title="Use letters only"
            required
          />

          <input
            className={css.input}
            type="email"
            name="email"
            placeholder="Email*"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            onInput={(event) => {
              const target = event.currentTarget;
              target.value = target.value.replace(/\s/g, '');
            }}
            pattern="^\S+@\S+\.\S+$"
            required
          />

          <input
            className={css.input}
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            min={minDate}
            required
          />

          <textarea
            className={css.textarea}
            name="comment"
            placeholder="Comment"
            autoComplete="off"
            value={formData.comment}
            onChange={handleChange}
          />

          <div className={css.buttonWrapper}>
            <button type="submit" className={css.button}>
              Send
            </button>
          </div>
        </form>

        {isSubmitted && (
          <p className={css.successMessage}>
            Your rental request has been sent successfully.
          </p>
        )}
      </div>
    </section>
  );
}
