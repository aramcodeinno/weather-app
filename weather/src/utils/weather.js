export const getWindDirectionText = (v) => {
    switch (v) {
        case "N": {
            return "North";
        }
        case "NbE": {
            return "North by East";
        }
        case "NNE": {
            return "North-Northeast";
        }
        case "NEbN": {
            return "Northeast by North";
        }
        case "NE": {
            return "Northeast";
        }
        case "NEbE": {
            return "Northeast by East";
        }
        case "ENE": {
            return "East-Northeast";
        }
        case "EbN": {
            return "East by North";
        }
        case "E": {
            return "East";
        }
        case "EbS": {
            return "East by South";
        }
        case "ESE": {
            return "East-Southeast";
        }
        case "SEbE": {
            return "Southeast by East";
        }
        case "SE": {
            return "Southeast";
        }
        case "SEbS": {
            return "Southeast by South";
        }
        case "SSE": {
            return "South-Southeast";
        }
        case "SbE": {
            return "South by East";
        }
        case "S": {
            return "South";
        }
        case "SbW": {
            return "South by West";
        }
        case "SSW": {
            return "South-Southwest";
        }
        case "SWbS": {
            return "Southwest by South";
        }
        case "SW": {
            return "Southwest";
        }
        case "SWbW": {
            return "Southwest by West";
        }
        case "WSW": {
            return "West-Southwest";
        }
        case "WbS": {
            return "West by South";
        }
        case "W": {
            return "West";
        }
        case "WbN": {
            return "West by North";
        }
        case "WNW": {
            return "West-Northwest";
        }
        case "NWbW": {
            return "Northwest by West";
        }
        case "NW": {
            return "Northwest";
        }
        case "NWbN": {
            return "Northwest by North";
        }
        case "NNW": {
            return "North-Northwest";
        }
        case "NbW": {
            return "North by West";
        }
        default:
            return v;
    }
};
