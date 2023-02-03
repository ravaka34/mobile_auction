import BalanceReload from './BalanceReload';
import Create from './Create';
import './ExploreContainer.css';
import MyAuction from './MyAuction';
import MyAuctionDetails from './MyAuctionDetails';
import Transactions from './Transactions';

interface ContainerProps {
  name: string;
}

const contents = new Map();
contents.set('Create', <Create/>);
contents.set('Auctions', <MyAuction />)
contents.set('BalanceReload', <BalanceReload />)
contents.set('Fiche', <MyAuctionDetails />)
contents.set('Transactions', <Transactions />)

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {

  const renderContent = () => {    
    return contents.get(name);
  }

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default ExploreContainer;
