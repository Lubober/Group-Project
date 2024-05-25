import { Dropdown, DropdownButton } from "react-bootstrap";

function TradeDropdown() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Dropdown button" className="dropdown-text">
      <Dropdown.Item href="#/action-1">Real Time</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Automated</Dropdown.Item>
    </DropdownButton>
  );
}

export default TradeDropdown;
