import APIService from './APIService';

const addEnergy = (userid, energy) =>
  APIService.mutation(
    `addEnergy(userid : "${userid}", energy: ${energy}){
          _id,energy,stars
        }`,
  ).then(response => response.data.data.addEnergy);

const setTutorial = (userid, energy, index) =>
  APIService.mutation(
    `setTutorial(userid : "${userid}", tutorial: ${energy}, index : ${index}){
          _id,energy,stars,tutorial
        }`,
  ).then(response => response.data.data.setTutorial);

const addBadge = (userid, badge) =>
  APIService.mutation(
    `addBadgePlayer(id : "${userid}", badge: "${badge}"){
          _id,energy,badges{ _id}
        }`,
  ).then(response => response.data.data.addBadge);

const addExp = (userid, exp) => {
  return APIService.mutation(
    `addExp(userid : "${userid}", exp: ${exp}){
          _id,exp,daily_exp,level,target_exp
        }`,
  ).then(response => response.data.data.addExp);
};
const addPlayerAchievement = (player, achievement, star, point) =>
  APIService.mutation(
    `addPlayerAchievement(player : "${player}", achievement : "${achievement}" star: ${star}, point: ${point})`,
  ).then(response => response.data.data.addPlayerAchievement);

const giveAchievement = (player, achievement) =>
  APIService.mutation(
    `giveAchievement(player : "${player}", achievement : "${achievement}" ){_id}`,
  ).then(response => response.data.data.giveAchievement);

const changeAvatar = (player, avatar) =>
  APIService.mutation(
    `changeAvatar(player : "${player}", avatar : "${avatar}"){_id,avatar{ imageid}}`,
  ).then(response => response.data.data.changeAvatar);

export default {
  setTutorial,
  addBadge,
  addEnergy,
  addPlayerAchievement,
  addExp,
  giveAchievement,
  changeAvatar,
};
