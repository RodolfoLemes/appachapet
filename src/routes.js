import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from './pages/main/index';
import Profile from './pages/profile/index';
import Login from './pages/login/index';

export default createAppContainer(
  createSwitchNavigator({
	  Main,
	  Profile,
	  Login,
  }, {
      // Configurações do switch navigator
  }),
)
