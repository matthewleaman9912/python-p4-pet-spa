import React, { useEffect, useState, useRef} from "react";
import { Formik, useFormik } from 'formik';
import * as yup from "yup";


function NewPet ({ onPetSubmit }) {

    const validationSchema = yup.object({
        name: yup.string()
          .min(2, 'Name must be at least 2 characters long'),
        age: yup.number()
          .required('Pets age is required')
          .max(15),
        species: yup.string()
          .required('Pets species is required'),
        image_url: yup.string()
          .required('Pets image URL is required')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            species: '',
            image_url: '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            fetch('/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to create');
                }
                return res.json();
            })
            .then(data => {
                onPetSubmit(data);
                resetForm();
            })
            .finally(() => setSubmitting(false));
        },
    });


  return (
    <form onSubmit={formik.handleSubmit} className="newpet">
      <h2 className="newpettitle">Create A New Pet!</h2>
      {formik.errors.name && <div>{formik.errors.name}</div>}
      <label>Pet's Name: </label>
      <input
        className="input-pets"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Enter Pet's Name..."
      />
      <br/>
      {formik.errors.age && <div>{formik.errors.age}</div>}
      <label>Pet's Age: </label>
      <input
        className="input-pets"
        name="age"
        value={formik.values.age}
        onChange={formik.handleChange}
        placeholder="Enter Pet's Age..."
      />
      <br/>
      {formik.errors.species && <div>{formik.errors.species}</div>}
      <label>Pet's Species: </label>
      <input
        className="input-pets"
        name="species"
        value={formik.values.species}
        onChange={formik.handleChange}
        placeholder="Enter Pet's Species..."
      />
      <br/>
      {formik.errors.image_url && <div>{formik.errors.image_url}</div>}
      <label>Pet's Image: </label>
      <input
        className="input-pets"
        name="image_url"
        value={formik.values.image_url}
        onChange={formik.handleChange}
        placeholder="Enter Pet's Image URL"
      />
      <br/>
      <button className="add-pet-btn" type="submit" disabled={formik.isSubmitting} >
        Add New Pet
      </button>
    </form>
  );
}
  
export default NewPet;