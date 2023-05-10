import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCreateSpot, fetchSpotDetails } from '../../store/spots';
import './SpotForm.css';

const SpotForm = ({ spot, formType}) => {
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
    const [previewImage, setPreviewImage] = useState('');
    const [imageA, setImageA] = useState('');
    const [imageB, setImageB] = useState('');
    const [imageC, setImageC] = useState('');
    const [imageD, setImageD] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const dispatch = useDispatch();


    const updateCountry = (e) => setCountry(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);
    const updateImgA = (e) => setImageA(e.target.value);
    const updateImgB = (e) => setImageB(e.target.value);
    const updateImgC = (e) => setImageC(e.target.value);
    const updateImgD = (e) => setImageD(e.target.value);

    useEffect(() => {
        const errors = [];
        if(!country.length) errors.push('Country is required');
        if(!address.length) errors.push('Address is required');
        if(!city.length) errors.push('City is required');
        if(!state.length) errors.push('State is required');
        if(!Number(lat)) errors.push('Latitude is required');
        if(!Number(lng)) errors.push('Longitude is required');
        if(!description.length) errors.push('Description is required');
        if(!name.length) errors.push('Name is required');
        if(!Number(price)) errors.push('Price is required');
        if(!previewImage.length) errors.push('Preview Image is required');
        setValidationErrors(errors);
    }, [country, city, address, state, lat, lng, description, name, price, previewImage])

    const handleSubmit = async (e) => {

        e.preventDefault();
        setHasSubmitted(true);
        const imagesArr = [previewImage, imageA, imageB, imageC, imageD]

        const spot = { 
                address, 
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price,
                imagesArr 
            };
        
        let newSpot = await dispatch(fetchCreateSpot(spot));
        console.log(newSpot, "newSpot details in SpotForm component----AFTER dispatching fetchCreateSpot")
        console.log("SpotForm component----AFTER dispatching fetchCreateSpot")

        if (newSpot) {
            let spotId = newSpot.id;
            
            history.push(`/spots/${newSpot.id}`);
            dispatch(fetchSpotDetails(spotId));
        }
        
    };
    
    return (
        <div className='create-spot-container'>
                <h2>{formType}</h2>
                    <h3>Where's your place located?</h3>
                        <p>Guests will only get your exact address once they have booked a reservation.</p>
                            <form className ='create-spot-form' onSubmit={handleSubmit} >                           
                                <div className='country-div'>
                                    <label htmlFor='Country'>Country</label>
                                        {hasSubmitted && !country && (
                                            <label htmlFor='Country' className='field-error'>Country is required</label>
                                        )}
                                        <input 
                                            type="text"
                                            placeholder="Country"
                                            required={true}
                                            value={country}
                                            onChange={updateCountry}
                                        />
                                 </div>
                                    <div className='address-div'>
                                        <label htmlFor='Address'>Street Address</label>
                                            {hasSubmitted && !address && (
                                                <label htmlFor='Address' className='field-error'>Address is required</label>
                                            )}
                                            <input 
                                                type="text"
                                                placeholder="Address"
                                                required={true}
                                                value={address}
                                                onChange={updateAddress}
                                            />
                                    </div>
                                        <div className='city-div'>
                                            <label htmlFor='City'>City</label>
                                                {hasSubmitted && !city && (
                                                    <label htmlFor='City' className='field-error'>City is required</label>
                                                )}
                                                <input 
                                                    type="text" 
                                                    placeholder="City"
                                                    required={true}
                                                    value={city}
                                                    onChange={updateCity}hange={e => setCity(e.target.value)}
                                                />
                                            <p>, </p>
                                            <label htmlFor='State'>State</label>
                                                {hasSubmitted && !state && (
                                                    <label htmlFor='State' className='field-error'>State is required</label>
                                                )}
                                                <input 
                                                    type="text" 
                                                    placeholder="State"
                                                    required={true}
                                                    value={state}
                                                    onChange={updateState}
                                                />
                                        </div>
                                            <div className='lat-lng-div'>
                                                <label htmlFor='Latitude'>Latitude</label>
                                                    {hasSubmitted && !lat && (
                                                        <label htmlFor='Latitude' className='field-error'>Latitude is required</label>
                                                    )}
                                                    <input 
                                                        type="text"
                                                        placeholder="Latiitude" 
                                                        required={true}
                                                        min='-180'
                                                        max='180'
                                                        value={lat}
                                                        onChange={updateLat}
                                                    />
                                                <label htmlFor='Longitude'>Longitude</label>
                                                    {hasSubmitted && !lng && (
                                                        <label htmlFor='Longitude' className='field-error'>Longitude is required</label>
                                                    )}
                                                    <input 
                                                        type="text"
                                                        placeholder="Longitude" 
                                                        required={true}
                                                        min='-180'
                                                        max='180'
                                                        value={lng}
                                                        onChange={updateLng}
                                                    />
                                            </div>
                                                <div className='description-div'>
                                                    <h3>Describe your place to guests</h3>
                                                    <p>Mention the best features of your space, any special amenitites like fast wifi or parking, and what you love about the neighborhood.</p>
                                                    <textarea 
                                                        placeholder="Description"
                                                        required={true}
                                                        minLength='30'
                                                        value={description}
                                                        onChange={updateDescription}
                                                    />
                                                    {hasSubmitted && description.length < 30 && (
                                                        <label htmlFor='Description' className='field-error'>Description needs a minimum of 30 characters</label>
                                                    )}
                                                </div>
                                                    <div className='spot-title-div'>
                                                        <h3>Create a title for your spot</h3>
                                                        <input 
                                                            type="text"
                                                            placeholder="Name of your spot"
                                                            required={true}
                                                            value={name}
                                                            onChange={updateName}
                                                        />
                                                        {hasSubmitted && !name && (
                                                            <label htmlFor='Name' className='field-error'>Name is required</label>
                                                        )}
                                                    </div>
                                                        <div className='spot-price-div'>
                                                            <h3>Set a base price for your spot</h3>
                                                            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                                                            &#36; <input 
                                                                type="text"
                                                                placeholder="Price per night (USD)"
                                                                required={true}
                                                                value={price}
                                                                onChange={updatePrice}
                                                            />
                                                            {hasSubmitted && !price && (
                                                                <label htmlFor='Price' className='field-error'>Price is required</label>
                                                            )}
                                                        </div>
                                                            <div className='spot-photos-div'>
                                                                <h3>Liven up your spot with photos</h3>
                                                                <p>Submit a link to at least one photo to publish your spot.</p>
                                                                <input 
                                                                    type="text"
                                                                    placeholder="Preview Image URL"
                                                                    value={previewImage}
                                                                    required={true}
                                                                    requiredpattern=".[jpg] | .[png] | .[jpeg]"
                                                                    onChange={updatePreviewImage}
                                                                />
                                                                {hasSubmitted && !previewImage && (
                                                                    <label htmlFor='Preview Image' className='field-error'>Preview image is required</label>
                                                                )}
                                                                <input 
                                                                    type="text"
                                                                    placeholder="Image URL"
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
                                                            </div>
                                    <input type="submit" value={formType} />
                            </form>
        </div>
    );


}

export default SpotForm;