export default function ExecutiveStatus(){

return(

<div
className="
bg-green-50
rounded-xl
border
border-green-200
shadow
p-6
mb-6
"
>

<div className="flex items-center justify-between">

<div>

<h2
className="
text-xl
font-bold
text-green-700
"
>

🟢 Status Monitoring

</h2>

<p
className="
text-gray-500
mt-1
"
>

Monitoring data kepegawaian berjalan normal.

</p>

</div>

<div
className="
text-right
"
>

<div
className="
text-3xl
font-bold
text-green-700
"
>

Monitoring Aktif

</div>

<p
className="
text-sm
text-gray-500
"
>

Terakhir diperbarui hari ini

</p>

</div>

</div>

</div>

);

}