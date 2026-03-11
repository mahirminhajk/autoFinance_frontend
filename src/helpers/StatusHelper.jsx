import { CgDanger as DangerIcon } from "react-icons/cg";
import Sidebar from "../components/sidebar/Sidebar";
import Tabbar from "../pages/customer/pages/formPage/components/Tabbar";

// const status = [
//     { name: 'pending', color: '#FFD2D2', link: 'general' },
//     { name: 'unconform3', color: '#FFE2B4', link: 'general' },
//     { name: 'unconform2', color: '#FFE8CC', link: 'general' },
//     { name: 'unconform1', color: '#FFF4CC', link: 'general' },
//     { name: 'conform', color: '#D2FFD2', link: 'general' },
//     { name: 'upload_docs', color: '#D2FFFF', link: 'doc' },
//     { name: 'verification', color: '#CCF5FF', link: 'verification' },
//     { name: 'ready_login', color: '#CCE5FF', link: 'ready' },
//     { name: 'login', color: '#CCE5FF', link: 'login' },
//     { name: 'ftr', color: '#CCE5FF', link: 'ftr' },
//     { name: 'loan_approved', color: '#C2E0FF', link: 'loan' },
//     { name: 'loan_desp', color: '#B4DAFF', link: 'desp' },
//     { name: 'rto_work', color: '#A9D3FF', link: 'rto' },
//     { name: 'completed', color: '#C2FFC2', link: 'completed' },
// ];

const status = [
    { name: 'pending', color: '#FFD2D2', link: 'general' },
    { name: 'reject', color: '#FFE2B4', link: 'ftr' },
    { name: 'pending_doc', color: '#FFE8CC', link: 'doc' },
    { name: 'unconform1', color: '#FFF4CC', link: 'general' },
    { name: 'conform', color: '#D2FFD2', link: 'general' },
    { name: 'rto_work', color: '#A9D3FF', link: 'rto' },
    { name: 'upload_docs', color: '#D2FFFF', link: 'doc' },
    { name: 'ready_login', color: '#CCE5FF', link: 'ready' },
    { name: 'login', color: '#CCE5FF', link: 'login' },
    { name: 'ftr', color: '#CCE5FF', link: 'ftr' },
    { name: 'verification', color: '#CCF5FF', link: 'verification' },
    { name: 'loan_approved', color: '#C2E0FF', link: 'loan' },
    { name: 'loan_desp', color: '#B4DAFF', link: 'desp' },
    { name: 'completed', color: '#C2FFC2', link: 'completed' },
];

//* get next status(action)
export const getNextStatus = (currentStatus) => {
    const index = status.findIndex((item) => item.name === currentStatus);
    if (index === -1) return null;
    return status[index + 1];
};

//* get next status(action) with comp
export const getNextStatusWithButton = (currentStatus, cusId, navigate) => {

    const index = status.findIndex((item) => item.name === currentStatus.toLowerCase());
    if (index === -1) return null;
    const statusObject = status[index + 1];

    if (statusObject) {
        return (
            <button className='capitalize py-1 px-2 rounded-full bg-secondary' onClick={() => navigate(`/customer/${cusId}/${statusObject.link}`)}>
                {statusObject.name.replaceAll('_', ' ').toUpperCase()}
            </button>
        );
    }
}
//* get current status with comp
export const getCurrentStatusWithComp = (currentStatus) => {
    const statusObject = status.find((item) => item.name === currentStatus.toLowerCase());

    if (statusObject) {
        return (
            <span className='capitalize py-1 px-2' style={{ backgroundColor: statusObject.color }}>
                {statusObject.name.replaceAll('_', ' ').toUpperCase()}
            </span>
        );
    }
}

export const getNextActionForCusInfo = (currentStatus, cusId, Link) => {
    const index = status.findIndex((item) => item.name === currentStatus?.toLowerCase());
    if (index === -1) return null;
    let statusObject = {};
    if (index >= 0 && index <= 3) {
        statusObject = status[4];
    } else {
        statusObject = status[index + 1];
    }


    if (statusObject) {
        return (
            <Link to={`/customer/${cusId}/${statusObject.link}`}>
                <div className='mt-3 ml-2 py-3 rounded-lg' style={{ backgroundColor: statusObject.color }}>
                    <div className='flex ml-4'>
                        <p className='text-sm font-semibold'>Action :</p>
                        <p className='ml-2 text-sm font-semibold text-gray-600  '>{statusObject.name.replaceAll('_', ' ').toUpperCase()}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

export const statusChecker = (requiredStatus, userStatus) => {
    const statusOrder = status.map(item => item.name);

    const requiredStatusIndex = statusOrder.findIndex(item => item === requiredStatus);
    const userStatusIndex = statusOrder.findIndex(item => item === userStatus);

    if (requiredStatusIndex === -1 || userStatusIndex === -1) return false;

    return requiredStatusIndex <= userStatusIndex;
};

export const StatusCheckerRender = ({ requiredStatus, userStatus, cusid }) => {
    const requiredStatusText = requiredStatus.replaceAll('_', ' ').toUpperCase();
    const userStatusText = userStatus.replaceAll('_', ' ').toUpperCase();

    return (
        <Sidebar>
            <Tabbar cusid={cusid} />
            <div className="flex flex-col justify-center items-center h-full">
                <DangerIcon className='text-7xl text-red-500' />
                <div className="text-red-300 text-center">
                    <p className='text-lg'>The required Status is <span className="font-semibold">{requiredStatusText}</span></p>
                    <p className='text-lg'>The Customer Status is <span className="font-semibold">{userStatusText}</span></p>
                </div>
            </div>
        </Sidebar>
    )
}

export const nextStatusLink = (currentStatus) => {
    if (currentStatus === 'completed') return '';

    const index = status.findIndex((item) => item.name === currentStatus);

    if (index === -1) return '';
    const statusObject = status[index + 1];

    if (statusObject) {
        return statusObject.link;
    }


} 