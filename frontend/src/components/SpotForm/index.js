import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCreateSpot, fetchSpotDetails } from '../../store/spots';
import './SpotForm.css';

const SpotForm = ({ formType}) => {
    console.log("Inside SpotForm component>>>>>>>>>>>>>>")
    
    const history = useHistory();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');    
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageA, setImageA] = useState('');
    const [imageB, setImageB] = useState('');
    const [imageC, setImageC] = useState('');
    const [imageD, setImageD] = useState('');
    const [imageE, setImageE] = useState('');
    const [errors, setErrors] = useState([]);
    
    const dispatch = useDispatch();

    const handleSubmit = (e) => {

        e.preventDefault();

        setErrors([])
        let errorsArr = []
        if(!country.length){
            errorsArr.push('Country is required')
        }
        if(!address.length){
            errorsArr.push('Address is required')
        }
        if(!city.length){
            errorsArr.push('City is required')
        }
        if(!state.length){
            errorsArr.push('State is required')
        }
        if(!lat.length){
            errorsArr.push('Latitude is required')
        }
        if(!lng.length){
            errorsArr.push('Longitude is required')
        }
        if(description.length < 30){
            errorsArr.push('Description needs a minimum of 30 characters')
        }
        if(!name.length){
            errorsArr.push('Name is required')
        }
        if(!price.length || price === 0){
            errorsArr.push('Price is required')
        }
        if(!imageA.length){
            errorsArr.push('Preview image is required')
        }

        setErrors(errorsArr)

        if(errorsArr.length){
            return errors
        }

        let spot = { 
                
                address, 
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price,
                images: [imageA, imageB, imageC, imageD, imageE] 
            };

        dispatch(fetchCreateSpot(spot))
        console.log("SpotForm component----AFTER dispatching fetchCreateSpot")
    
        history.push(`/spots/${spot.id}`);
    };

    return (
        <form onSubmit={handleSubmit} >
          <h2>{formType}</h2>
          <label>
            Country
            <input 
                type="text"
                placeholder="country"
                value={country}
                onChange={e => setCountry(e.target.value)}
            />
          </label>
          <label>
            Address
            <input 
                type="text"
                placeholder="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
            />
          </label>
          <label>
            City
            <input 
                type="text" 
                placeholder="city"
                value={city}
                onChange={e => setCity(e.target.value)}
            />
          </label>
          <label>
            State
            <input 
                type="text" 
                placeholder="state"
                value={state}
                onChange={e => setState(e.target.value)}
            />
          </label>
          <label>
            Latitude
            <input 
                type="text"
                value={lat}
                onChange={e => setLat(e.target.value)}
            />
          </label>
          <label>
            Longitude
            <input 
                type="text"
                placeholder="lng" 
                value={lng}
                onChange={e => setLng(e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea 
                placeholder="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
          </label>
          <label>
            Title
            <input 
                type="text"
                placeholder="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
          </label>
          <label>
            Price
            <input 
                type="number"
                placeholder="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
          </label>
          <label>
            Photos
            <input 
                type="text"
                placeholder="Preview Image URL"
                value={imageA}
                onChange={e => setImageA(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Image URL"
                value={imageB}
                onChange={e => setImageB(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Image URL"
                value={imageC}
                onChange={e => setImageC(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Image URL"
                value={imageC}
                onChange={e => setImageC(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Image URL"
                value={imageD}
                onChange={e => setImageD(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Image URL"
                value={imageE}
                onChange={e => setImageE(e.target.value)}
            />
          </label>
          <input type="submit" value={formType} />
        </form>
      );


}

export default SpotForm;