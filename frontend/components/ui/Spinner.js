import Image from 'next/image'
import spinner from '../../public/infinity.gif'

const Spinner = () => {
    return (
        <Image
            src={spinner}
            style={{margin:'auto', display:'block'}}
            alt="Loading...."
        />
    )
}

export default Spinner