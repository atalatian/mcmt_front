export interface Require {
    src: string,
}

const TopShot = (props: Require) => {

    const { src } = props

    return(
        <img src={src} alt={'TopShot'}/>
    )
}

export default TopShot;