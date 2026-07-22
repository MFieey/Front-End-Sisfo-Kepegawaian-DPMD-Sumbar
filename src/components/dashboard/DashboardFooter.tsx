export default function DashboardFooter(){

    return(

        <div
            className="
            mt-8
            text-center
            text-sm
            text-gray-500
            pb-5
            "
        >

            © {new Date().getFullYear()} Dinas Pemberdayaan
            Masyarakat dan Desa Provinsi Sumatera Barat.

            <br/>

            Sistem Informasi Manajemen Kepegawaian
            Versi 1.0

            <br/>
            <br/>

            Developed by Fikri with ❤️ using
            Next.js • Express.js • Prisma ORM • MySQL

        </div>

    );

}