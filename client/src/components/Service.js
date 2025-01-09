import React, { useState, useEffect } from "react";


function Services({ name, time, image, reviews }) {
    const [isShowing, setIsShowing] = useState(false)

    return(
        <div>
            <div className="container">
                <ul>
                {isShowing ? (
                    <div className="servicegrid">
                        <p>Service: {name} </p>
                        <p>Service Length: {time} minutes </p>
                        <p>Pets Who Have Used this service!</p>
                        <ul>
                            {reviews.map((review) => (
                                <div key={review.id} className="servicereviews">
                                <p> Pet's Name: {review.pet.name}</p>
                                <p>Pet's Rating: {review.rating} out of 5</p>
                                <p>Pet's Summary: {review.summary}</p>
                                </div>
                            ))}
                        </ul>
                        
                        <button className="button" onClick={() => setIsShowing(!isShowing)}>No More Pets!</button>
                        
                    </div>
                ) : (
                    <div>
                        <p>Service: {name} </p>
                        <p>Service Length: {time} minutes </p>
                        <img className="image" src={image} />
                        <button className="button" onClick={() => setIsShowing(!isShowing)}>View Pets!</button>
                    </div>
                )}
                </ul>
            </div>
        </div>
    )
}

export default Services;