import React from "react";
import Pet from "./Pet";
import NewPet from "./NewPet";

function PetList({
    pets,
    onPetDelete,
    onUpdatePet,
    handleAddPet
}) {

    return (
        <div>
            <h2 class="clienttitle">Here Are Our Clients!</h2>
            <ul class="list">
                {pets.map((pet) => (
                    <Pet
                        key={pet.id}
                        id={pet.id}
                        name={pet.name}
                        age={pet.age}
                        species={pet.species}
                        image={pet.image_url}
                        onPetDelete={onPetDelete}
                        onUpdatePet={onUpdatePet}
                        reviews = {pet.reviews}
                    />
                ))}
            </ul>
            <NewPet onPetSubmit={handleAddPet} />
        </div>
    );
}

export default PetList;