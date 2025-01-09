import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import PetList from "./PetList";
import NavBar from "./NavBar";
import Logo from "./Logo";
import ServicesList from "./ServicesList";
import NewReview from "./NewReview";

function App() {
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [increment1, setIncrement1] = useState(0);
  const [increment2, setIncrement2] = useState(0);
  const [increment3, setIncrement3] = useState(0);
  
  
  useEffect(() => {
    fetch('/pets')
    .then((r) => r.json())
    .then((data) => setPets(data));
  }, [increment1]);

  useEffect(() => {
    fetch('/services')
    .then((r) => r.json())
    .then((data) => setServices(data));
  }, [increment2]);

  useEffect(() => {
    fetch('/reviews')
    .then((r) => r.json())
    .then((data) => setReviews(data));
  }, [increment3]);


  function handleAddPet(newPet) {
    setPets([...pets, newPet]);
    setIncrement1((increment1) => increment1 + 1);
  }

  function handleAddService(newService) {
    setServices([...services, newService]);
    setIncrement2((increment2) => increment2 + 1);
  }

  function handleAddReview() {
    fetch('/reviews')
    .then(res => res.json())
    .then(data => setReviews(data))
    setIncrement1((increment1) => increment1 + 1);
    setIncrement2((increment2) => increment2 + 1);
  }

  function handleDeletePet(id) {
    const updatedPets = pets.filter((pet) => pet.id !== id);
    setPets(updatedPets);
    setIncrement1((increment1) => increment1 + 1);
    setIncrement2((increment2) => increment2 + 1);
  }

  function handleUpdatePet(updatedPetObj) {
    const updatedPets = pets.map((pet) => {
      if (pet.id === updatedPetObj.id) {
        return updatedPetObj;
      } else {
        return pet;
      }
    });
    setPets(updatedPets);
    setIncrement1((increment1) => increment1 + 1);
    setIncrement2((increment2) => increment2 + 1);
  }

  return (
    <>
      <main>
        <NavBar/>
          <h1 class="openertitle">Welcome to the Pet Spa</h1>
          <Logo />
          <Switch>
            <Route exact path="/services">
              <ServicesList services={services} onAddService={handleAddService} onUpdatePet={handleAddPet} pets={pets} />
            </Route>
            <Route exact path="/" > 
               <PetList pets={pets} onPetDelete={handleDeletePet} onUpdatePet={handleUpdatePet} handleAddPet={handleAddPet} services={services} reviews={reviews}/>
            </Route>
            <Route exact path="/newreview">
              <NewReview handleAddReview={handleAddReview} services={services} pets={pets}/>
            </Route>
          </Switch>
      </main>
    </>
  );
}

export default App;