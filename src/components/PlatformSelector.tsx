import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms from "../hooks/usePlatforms";

const PlatformSelector = () => {
  const { data } = usePlatforms();
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Platforms
        <MenuList>
          {data.map((playform) => (
            <MenuItem key={playform.id}>{playform.name}</MenuItem>
          ))}
        </MenuList>
      </MenuButton>
    </Menu>
  );
};

export default PlatformSelector;
