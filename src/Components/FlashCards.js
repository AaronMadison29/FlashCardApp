import React from 'react';
import axios from 'axios';

var ApiCards = [];

axios.get('https://localhost:44393/api/collection').then((response) => {
    ApiCards = response.data;
    });

    export default ApiCards