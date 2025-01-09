import React from "react";
import Service from "./Service"
import NewService from "./NewService"


function ServicesList( {services, onAddService, onUpdatePet} ) {
    return (
        <div>
            <h2 class="clienttitle">Here Are Our Services!</h2>
            <ul class="list">
                {services.map((service) => (
                    <Service
                        key={service.id}
                        name={service.service_name}
                        time={service.time}
                        image={service.image_url}
                        reviews = {service.reviews}
                    />
                ))}
            </ul>
            <NewService onAddService={onAddService} />
        </div>
    );
}

export default ServicesList;