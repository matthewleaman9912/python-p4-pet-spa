import React, { useState } from "react";
import { Formik, useFormik } from "formik"; 

function EditPet({ id, name, age, species, image, onUpdatePet }) {

    const formik = useFormik({
        initialValues: {
            name: name,
            age: age,
            species: species,
            image_url: image,
        },
        onSubmit: async (values) => {
            try {
                const response = await fetch(`/pets/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const updatedPet = await response.json();
                onUpdatePet(updatedPet);
            } catch (error) {
                throw new Error('Nope')
            }
        },
    });


    return (
        <Formik>
            <form onSubmit={formik.handleSubmit} className="edit-pet-form">
                <h3>Edit Pet</h3>
                <input 
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Pet Name"
                />
                <input
                    type="text"
                    name="age"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    placeholder="Pet Age"
                />
                <input
                    type="text"
                    name="species"
                    onChange={formik.handleChange}
                    value={formik.values.species}
                    placeholder="Pet Species"
                />
                <input
                    type="text"
                    name="image_url"
                    onChange={formik.handleChange}
                    value={formik.values.image_url}
                    placeholder="Pet Image URL"
                />
                <button type="submit">Save</button>
            </form>
        </Formik>
    );
}

export default EditPet;