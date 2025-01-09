from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer)
    species = db.Column(db.String)
    image_url = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='pet', cascade='all, delete-orphan')

    serialize_rules = ('-services.pets', '-reviews.pets',)

    @validates('name')
    def validate_name(self, key, name):
        if name == '':
            raise ValueError('Your pet needs a name!')
        return name


class Service(db.Model, SerializerMixin):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key = True)
    service_name = db.Column(db.String, nullable = False)
    time = db.Column(db.Integer)
    image_url = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='service', cascade='all, delete-orphan')

    serialize_rules = ('-pets.services', '-reviews.services',)

    @validates('service_name')
    def validate_service_name(self, key, service_name):
        if service_name == '':
            raise ValueError('Not a valid service')
        return service_name


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    summary = db.Column(db.String)
    rating = db.Column(db.Integer)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))
    service_id = db.Column('service_id', db.Integer, db.ForeignKey('services.id'))

    pet = db.relationship('Pet', back_populates='reviews')
    service = db.relationship('Service', back_populates='reviews')

    serialize_rules = ('-service.reviews','-pet.reviews', '-reviews',)

    
    

