import React, { useEffect, useState, useRef} from "react";
import { Field, Formik, useFormik } from 'formik';
import * as yup from "yup";

function NewReview ({ handleAddReview, pets, services }) {

        const validationSchema = yup.object({
            summary: yup.string()
                .min(5, 'Summary must be at least 5 characters long')
                .required('Summary is required'),
            rating: yup.number()
              .required('Rating is required')
              .max(5, "Rating must be at most 5")
              .min(1, "Rating must be at least 1"),
            pet_id: yup.number()
              .required('Pet is required'),
            service_id: yup.string()
              .required('Service is required')
        })
    
        const formik = useFormik({
            initialValues: {
                summary: '',
                rating: '',
                pet_id: '',
                service_id: '',
            },
            validationSchema,
            enableReinitialize: true,
            onSubmit: (values, { setSubmitting, resetForm }) => {
                fetch('/reviews', {
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
                    handleAddReview(data);
                    resetForm();
                })
                .finally(() => setSubmitting(false));
            },
        });
    
    
      return (
        <form onSubmit={formik.handleSubmit} className="newreview">
            <h2>Create A New Review!</h2>
          {formik.errors.summary && <div>{formik.errors.summary}</div>}
          <label>Review's Summary: </label>
          <br/>
          <textarea
            className="input-pets"
            name="summary"
            value={formik.values.summary}
            onChange={formik.handleChange}
            placeholder="Enter Review Summary..."
          />
          <br/>
          {formik.errors.rating && <div>{formik.errors.rating}</div>}
          <label>Review's Rating: </label>
          <input
            className="input-pets"
            name="rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            placeholder="Enter Review Rating..."
          />
          <br/>
          {formik.errors.pet_id && <div>{formik.errors.pet_id}</div>}
          <label>Pet Leaving Review: </label>
          <br/>
          <select name="pet_id" value={formik.values.pet_id} onChange={formik.handleChange} placeholder="Select Pet...">
            {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                        {pet.name}
                    </option>
            ))}
            </select>
            <br/>
          {formik.errors.service_id && <div>{formik.errors.service_id}</div>}
          <label>Service Under Review: </label>
          <br/>
          <select name="service_id" value={formik.values.service_id} onChange={formik.handleChange} placeholder="Select Service..." >
            {services.map((service) => (
                <option key={service.id} value={service.id}>
                    {service.service_name}
                </option>
            ))}
          </select>
          <br/>

          <button className="add-pet-btn" type="submit" disabled={formik.isSubmitting} >
            Add New Pet
          </button>
        </form>
      );
    }

      
    export default NewReview;
