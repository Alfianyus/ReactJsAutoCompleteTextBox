import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [allcountry, setAllcountry] = useState([]);
    const [filterresult, setFilterresult] = useState([]);
    const [searchcontry, setSearchcountry] = useState("");

    const handlesearch = (event) => {
        const search = event.target.value;
        console.log(search);
        setSearchcountry(search);

        if (search !== "") {
            const filterdata = allcountry.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
            setFilterresult(filterdata);
        } else {
            setFilterresult(allcountry);
        }



    };

    useEffect(() => {
        const getcountry = async () => {
            const getres = await fetch("http://127.0.0.1:8000/api/autocomplete");
            const setcountry = await getres.json();
            console.log(setcountry.results);
            setAllcountry(await setcountry.results);
        };
        getcountry();
    }, []);



    return (
        <div className="container">
            <div className='row'>
                <h3>React Js Auto complete Text Box| Filter search</h3>
                <div className='col-md-6 mb-3 mt-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Enter Keyboard'
                        onChange={(e) => {
                            handlesearch(e);
                        }}
                    />
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>County ID</th>
                                <th>Country Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchcontry.length > 1
                                ? filterresult.map((filtercountry, index) => (
                                    <tr key={index}>
                                        <td>{filtercountry.id}</td>
                                        <td>{filtercountry.countryName}</td>
                                    </tr>
                                ))



                                : allcountry.map((getcon, index) => (
                                    <tr key={index}>
                                        <td>{getcon.id}</td>
                                        <td>{getcon.countryName}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
