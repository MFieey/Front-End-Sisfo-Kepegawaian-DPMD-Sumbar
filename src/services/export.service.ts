import api from "@/lib/axios";

export const exportMonitoringPdf = async () => {
    const response = await api.get(
        "/export/monitoring/pdf",
        {
            responseType: "blob",
        }
    );

    return response;
};

export const exportPegawaiExcel = async () => {

    return await api.get(

        "/export/pegawai/excel",

        {

            responseType:"blob",

        }

    );

};

export const exportPegawaiPdf = async () => {

    return await api.get(

        "/export/pegawai/pdf",

        {

            responseType: "blob",

        }

    );

};

export const exportMonitoringPeriodePdf = async (

    type:string,

    month:number,

    year:number,

    status:string,
    
    statusDokumen:string,

    date:string

) => {

    return await api.get(

        "/export/monitoring/periode/pdf",

        {

            params:{

                type,

                month,

                year,

                status,

                statusDokumen,

                date,

            },

            responseType:"blob",

        }

    );

};

export const exportMonitoringBerkalaPdf = () => {
    return api.get(
        "/export/monitoring/berkala/pdf",
        {
            responseType: "blob",
        }
    );
};

export const exportMonitoringPangkatPdf = () => {
    return api.get(
        "/export/monitoring/pangkat/pdf",
        {
            responseType: "blob",
        }
    );
};

export const exportMonitoringPeriodeExcel = async (

    type:string,

    month:number,

    year:number,

    status:string,

    statusDokumen:string,

    date:string

) => {

    return await api.get(

        "/export/monitoring/periode/excel",

        {

            params:{

                type,

                month,

                year,

                status,

                statusDokumen,

                date,

            },

            responseType:"blob",

        }

    );

};

export const exportMonitoringDokumenPdf = async (

    status: string

) => {

    return await api.get(

        "/export/monitoring-dokumen/pdf",

        {

            params: {

                status,

            },

            responseType: "blob",

        }

    );

};

export const exportPegawaiDetailPdf = async (
    id:number
)=>{

    return api.get(

        `/export/pegawai/detail/pdf?id=${id}`,

        {

            responseType:"blob"

        }

    );

};