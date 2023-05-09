import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

export default function Loader() {
    return (<div className="loader" style={{position: "fixed", width: "fit-content", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}><Spin indicator={antIcon} /></div>)
}