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

    year:number

) => {

    return await api.get(

        "/export/monitoring/periode/pdf",

        {

            params:{

                type,

                month,

                year,

            },

            responseType:"blob",

        }

    );

};

export const exportMonitoringPeriodeExcel = async (

    type:string,

    month:number,

    year:number

) => {

    return await api.get(

        "/export/monitoring/periode/excel",

        {

            params:{

                type,

                month,

                year,

            },

            responseType:"blob",

        }

    );

};