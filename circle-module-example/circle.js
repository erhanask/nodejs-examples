function circleCalculator(r) {
    return {
        area: Math.PI * r * r,
        circumference: 2 * Math.PI * r
    }
}

module.exports = circleCalculator;