module.exports = computeDistance = (startCoords, destCoords) => {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371; //지구의 반경(km)
    var distance =
        Math.acos(
            Math.sin(startLatRads) * Math.sin(destLatRads) +
                Math.cos(startLatRads) *
                    Math.cos(destLatRads) *
                    Math.cos(startLongRads - destLongRads)
        ) * Radius;

    return distance.toFixed(2);
};

const degreesToRadians = (degrees) => {
    radians = (degrees * Math.PI) / 180;
    return radians;
};
