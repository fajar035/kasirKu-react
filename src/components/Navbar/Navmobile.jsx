import { useEffect, useState } from 'react';

import './styles2.css';
import { UilListUl } from '@iconscout/react-unicons';

function Navmobile() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.getElementById('user').style.width = '100%';
    } else {
      document.getElementById('user').style.removeProperty('width');
    }
  }, [isOpen]);

  return (
    <div className="section-nav">
      <UilListUl className="icon-menu-nav" onClick={handleMenu} />
    </div>
  );
}

export default Navmobile;
