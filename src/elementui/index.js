import Vue from 'vue';
import {
  Table,
  TableColumn,
  Button,
  Row,
  Col,
  Tabs,
  TabPane,
  Pagination,
  Input,
  Menu,
  MenuItem,
  Submenu,
  Scrollbar,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Form,
  FormItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Select,
  Option,
  Link,
  Dialog,
  Message,
  MessageBox,
  Loading,
  CheckboxButton,
  Popover,
  Autocomplete,
  Progress,
  InfiniteScroll,
  Drawer, InputNumber, Empty, Radio, Tooltip, RadioGroup, Upload, Checkbox, CheckboxGroup, DatePicker, Descriptions,
  DescriptionsItem, Badge, Tag, ButtonGroup,
  Divider,
  Tree
} from 'element-ui';
const componentsArr = [
  Table,
  TableColumn,
  Button,
  Row,
  Col,
  Tabs,
  TabPane,
  Pagination,
  Input,
  Menu,
  MenuItem,
  Submenu,
  Scrollbar,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Form,
  FormItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Select,
  Option,
  Link,
  Dialog,
  Message,
  MessageBox,
  Radio,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  RadioGroup,
  Popover,
  DatePicker,
  Descriptions,
  DescriptionsItem,
  Upload,
  Autocomplete,
  Progress,
  Empty, Drawer, InputNumber, Tooltip,Badge,Tag,ButtonGroup,
  Divider,
  Tree
];
Vue.use(Loading.directive);
Vue.use(InfiniteScroll);
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$loading = Loading.service;
export default {
  install: function(Vue) {
    componentsArr.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
