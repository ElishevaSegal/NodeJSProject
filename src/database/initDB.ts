import { Logger } from "../logs/logger";
import { cards } from "./cards";
import { Card } from "./model/card";
import { User } from "./model/user";
import { users } from "./users";
const initDBUsers = async () => {
  

  //add 3 users
  const usersCount = await User.countDocuments();
  if (usersCount > 2) return;

  for (let user of users) {
    const saved = await new User(user).save();
    Logger.verbose("Added user: ", saved);
  }
};
 // add 3 cards
const initDBCards = async () => {
  const cardsCount = await Card.countDocuments();
  if (cardsCount > 2) return;

  for (let card of cards) {
    const saved = await new Card(card).save();
    Logger.verbose("Added card: ", saved);
  }
};

export { initDBUsers, initDBCards };
