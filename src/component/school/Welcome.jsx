import { useParams } from "react-router-dom"

export default function Welcome(){
    const {username} = useParams();
    return(
        <div className="text-red-600 text-2xl">Welcome {username}</div>
    )
}