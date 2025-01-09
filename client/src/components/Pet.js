import React, { useState } from "react";
import EditPet from "./EditPet";


function Pet({ id, name, age, species, image, onPetDelete, onUpdatePet, reviews }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isShowing, setIsShowing] = useState(false);

    function handleDeleteClick() {
        fetch(`http://127.0.0.1:5555/pets/${id}`, {
            method: "DELETE",
        });

        onPetDelete(id);
    }

    function handleUpdatePet(updatedPet) {
        setIsEditing(false);
        onUpdatePet(updatedPet);
    }

    return (
        <div class="container">
            <ul>
                {isEditing ? (
                    <EditPet
                        id={id}
                        name={name}
                        age={age}
                        species={species}
                        image={image}
                        onUpdatePet={handleUpdatePet}
                    />
                ) : (
                    <div>
                        {isShowing ? (
                            <div>
                                <p>Pet Name: {name}</p>
                                <p>Age: {age}</p>
                                <p>Species: {species}</p>
                                <p>Service's For This Pet:</p>
                                <ul>
                                    {reviews.map((review) => (
                                        <div key={review.id} className="servicereviews">
                                        <p>Service Name: {review.service.service_name}</p>
                                        <p>Rating: {review.rating}</p>
                                        <p>Summary: {review.summary}</p>
                                        </div>
                                    ))}
                                </ul>
                                <button className="button" onClick={() => setIsShowing((!isShowing))}>No More Services!</button>
                            </div>
                        ) : (
                            <div>
                                <p>Pet Name: {name}</p>
                                <p>Age: {age}</p>
                                <p>Species: {species}</p>
                                <img class="image" src={image}></img>
                                <button className="button" onClick={() => setIsShowing((!isShowing))}>Show Services!</button>
                            </div>
                            )}
                        
                    </div>
                )}

                <div>
                    <button class="button" onClick={() => setIsEditing((isEditing) => !isEditing)}>
                        <span role="img" aria-label="edit">
                            ✏️
                        </span>
                    </button>
                    <button class="button" onClick={handleDeleteClick}>
                        <span role="img" aria-label="delete">
                            🗑
                        </span>
                    </button>
                </div>
            </ul>
        </div>
    );
}

export default Pet;
