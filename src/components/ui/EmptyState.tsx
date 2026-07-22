type Props = {

    text:string;

}

export default function EmptyState({

text,

}:Props){

return(

<div

className="

text-center

text-gray-500

py-8

"

>

{text}

</div>

)

}