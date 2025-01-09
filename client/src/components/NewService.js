import { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, useFormik } from "formik";


function NewService({ onAddService }) {

    const [services, setServices] = useState([]);

    

    const validationSchema = yup.object({
        service_name: yup.string()
          .required('Service Name is required')
          .min(4, 'Service Name must be at least 4 characters long'),
        time: yup.number()
          .required('Service Time is required'),
        image_url: yup.string()
          .required('Pets image URL is required')
    })

    const formik = useFormik({
        initialValues: {
            service_name: '',
            time: '',
            image_url: '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            fetch('/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed');
                }
                return res.json();
            })
            .then(data => {
                onAddService(data);
                resetForm();
            })
            .finally(() => setSubmitting(false));
        },
    });

    return(
        <form onSubmit={formik.handleSubmit} className="service-form">
            <h2>Create A New Service!</h2>
            {formik.errors.service_name && <div>{formik.errors.service_name}</div>}
            <label>Service's Name: </label>
            <input
                className="input-service"
                name="service_name"
                value={formik.values.service_name}
                onChange={formik.handleChange}
                placeholder="Enter Service's Name..."
            />
            <br/>
            {formik.errors.time && <div>{formik.errors.time}</div>}
            <label>Service's Time: </label>
            <input
                className="input-service"
                name="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                placeholder="Enter Service's Time..."
            />
            <br/>
            {formik.errors.image_url && <div>{formik.errors.image_url}</div>}
            <label>Service's Image: </label>
            <input
                className="input-service"
                name="image_url"
                value={formik.values.image_url}
                onChange={formik.handleChange}
                placeholder="Enter Pet's Image URL"
            />
            <br/>
            <button className="add-service-btn" type="submit" disabled={formik.isSubmitting}>
                Add New Service
            </button>
        </form>
  );
}

export default NewService;