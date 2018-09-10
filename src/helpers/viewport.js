const breakpoints = {
    small: 768,
    medium: 1024,
    large: 1440
}

export const isSmall = () => {
    console.log('issmall')
    return (window.matchMedia(`(max-width: ${breakpoints.small}px)`).matches);
}

export const isMedium = () => {
    return (window.matchMedia(`(min-width: ${breakpoints.medium}px)`).matches);
}

export const isLarge = () => {
    return (window.matchMedia(`(min-width: ${breakpoints.large}px)`).matches);
}
