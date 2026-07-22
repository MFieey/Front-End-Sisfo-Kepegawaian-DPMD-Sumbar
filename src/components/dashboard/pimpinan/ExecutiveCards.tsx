type Props = {

    dashboard:any;

};

export default function ExecutiveCards({

    dashboard,

}:Props){

return(

<div className="grid grid-cols-4 gap-5 mb-6">

<div className="bg-white rounded-xl shadow p-6">

<div className="text-5xl">

👥

</div>

<p className="mt-4 text-gray-500">

Total Pegawai

</p>

<h2 className="text-4xl font-bold text-green-700">

{dashboard.totalPegawai}

</h2>

</div>

<div className="bg-white rounded-xl shadow p-6">

<div className="text-5xl">

📅

</div>

<p className="mt-4 text-gray-500">

Reminder Berkala

</p>

<h2 className="text-4xl font-bold text-yellow-600">

{dashboard.totalReminderBerkala}

</h2>

</div>

<div className="bg-white rounded-xl shadow p-6">

<div className="text-5xl">

📈

</div>

<p className="mt-4 text-gray-500">

Reminder Pangkat

</p>

<h2 className="text-4xl font-bold text-red-600">

{dashboard.totalReminderPangkat}

</h2>

</div>

<div className="bg-white rounded-xl shadow p-6">

<div className="text-5xl">

🎂

</div>

<p className="mt-4 text-gray-500">

Ulang Tahun

</p>

<h2 className="text-4xl font-bold text-pink-600">

{dashboard.ulangTahunBulanIni.length}

</h2>

</div>

</div>

);

}