<template>
  <div class="hello">
  
    
    <button style="float: right; margin-bottom: 1em;" @click.prevent="toggleShare">Share</button>
    <a v-if="showShare" class="sharelink" :href="'#/' + computedId" style="margin-bottom: 1em;">{{shareLinkUrl}}#/{{computedId}}</a>
    <button v-if="!showExport" @click.prevent="gotoExport" style="clear: right; float: right; margin-bottom: 1em;">
      Export
    </button>
    <div v-if="showExport" style="clear: right;">
      <fieldset>
        <legend>Export</legend>
        <label for="buildname" style="width: 6em; margin-top: 0;">Build Name:</label><input id="buildname" type="text" v-model="exportName">
        <div style="width: 100%; margin-top: 1em;">
          <button style="margin: 1em" @click.prevent="doExport">Export</button><button style="margin: 1em" @click.prevent="cancelExport">Cancel</button>
        </div>
      </fieldset>
      
     
    </div>
    <div>
      
      <fieldset style="clear: right; ">
        <legend>Class</legend>
        <select v-model="selectedHeroId" @change="setDefaultSelectedSlots" >
            <option v-for="hero in heroes" :value="hero.id" :key="hero.id">{{hero.name}}</option>
        </select>
      </fieldset>
      <pre style="display: none;">{{JSON.stringify(selectedHero, undefined, 2)}}</pre>
      <Hotbar v-if="heroes.length > 0" :abilities="abilities" :spelldescs="spelldescs" :selectedSlot1="selectedSlot1" :selectedSlot2="selectedSlot2" :selectedSlot3="selectedSlot3" :selectedSlot4="selectedSlot4" :signature="selectedHero.signature" @slotchange="handleSlotChange"></Hotbar>
      <Talents :talentList="talents" :selectedHero="selectedHero" :selectedLvl1="selectedLvl1" :selectedLvl2="selectedLvl2" :selectedLvl3="selectedLvl3" :selectedLvl4="selectedLvl4" @talentChange='handleTalentChange'></Talents>
      <Gems :gemList="gems" :selectedHero="selectedHero" :selectedSapp1="selectedSapp1" :selectedSapp2="selectedSapp2" :selectedRuby1="selectedRuby1" :selectedRuby2="selectedRuby2" :selectedPris1="selectedPris1" :selectedPris2="selectedPris2" @gemChange="handleGemChange" ></Gems>
      <div>
        <fieldset>
          <legend>Stats</legend>
          <div style="margin-bottom: 1em;"><label for="level">Level:</label><select id="level" v-model="level"> <option v-for="i in [1, 2, 3, 4, 5, 6]" 
          :key="i">{{i}}</option> </select></div>
          <div v-for="(val, key) in compStats" :key="key">{{key}}: <span v-if="(key.indexOf('Cooldown') > -1 && val < -33)">-33</span><span v-else>{{val}}</span><span v-if="['Health', 'Potions', 'Dodges', 'Impact Resistance', 'Aerial Combat', 'Potion Crates'].indexOf(key) == -1">%</span></div>
        </fieldset>
      </div>
    </div>
    <div style="font-family: 'Lucida Console'; margin-top: 2em; display: none;">ID: {{computedId}}</div>
  </div>
</template>

<script>
import axios from 'axios';
import Hotbar from './Hotbar.vue'
import Talents from './Talents.vue'
import Gems from './Gems.vue'
import HeroesJson from '../../public/heroes.json'
import AbilitiesJson from '../../public/abilities.json'
import TalentsJson from '../../public/talents.json'
import GemsJson from '../../public/gems.json'

export default {
  name: 'Builder',
  props: {
  },
  data () {
  let routerId = this.$route.params.id
    return { 
      selectedHeroId: this.parseRouterId(routerId, 0, 1),
      selectedSlot1: this.parseRouterId(routerId, 1, 1),
      selectedSlot2: this.parseRouterId(routerId, 2, 2),
      selectedSlot3: this.parseRouterId(routerId, 3, 3),
      selectedSlot4: this.parseRouterId(routerId, 4, 4),
      selectedLvl1: this.parseRouterId(routerId, 5, 1),
      selectedLvl2: this.parseRouterId(routerId, 6, 2),
      selectedLvl3: this.parseRouterId(routerId, 7, 3),
      selectedLvl4: this.parseRouterId(routerId, 8, 24),
      selectedSapp1: this.parseRouterId(routerId, 9, 0),
      selectedSapp2: this.parseRouterId(routerId, 10, 0),
      selectedRuby1: this.parseRouterId(routerId, 11, 0),
      selectedRuby2: this.parseRouterId(routerId, 12, 0),
      selectedPris1: this.parseRouterId(routerId, 13, 0),
      selectedPris2: this.parseRouterId(routerId, 14, 0),
      heroes: [],
      abilities: AbilitiesJson,
      spelldescs: {},
      talents: TalentsJson,
      gems: GemsJson,
      showShare: false,
      base_stats: {
        "Health": 2500,
        "Dodges": 2,
      },
      level: 4,
      showExport: false,
      exportName: ""
    }
  },
  components: {
    Hotbar,
    Talents,
    Gems
  },
  created () {
    let $vm = this;
    
    $vm.heroes = HeroesJson.sort(function(o1, o2){
      let retVal = 0
      if (o1.name > o2.name) {
        retVal = 1;
      }else if (o1.name < o2.name){
        retVal = -1
      }
      return retVal;
    });
    let spellsurl = (location.host == 'breach.gamepedia.com') ? 'https://breach.gamepedia.com/api.php?action=parse&format=json&page=Spells' : process.env.BASE_URL +'spells.html'
    axios.get(spellsurl).then((results) => {
      let parser = new DOMParser();
      let htmlstr = (location.host == 'breach.gamepedia.com') ? results.data.parse.text['*'] : results.data
      let spelldoc = parser.parseFromString(htmlstr, 'text/html');
      let spelltrs = spelldoc.querySelectorAll('table tbody tr');
      for(let spelltr of spelltrs){
        let spelltds = spelltr.getElementsByTagName('td');
        if (spelltds.length > 3){
          $vm.spelldescs[spelltds[1].innerText] = spelltds[2].innerHTML.replace(/<p>/g, '').replace(/<\/p>/g, '')
        }
        
      }
    })
    
  },
  computed: {
    compStats: function(){
      let stats = (this.selectedHero.school == 'Veil Demon') ? {} : JSON.parse(JSON.stringify(this.base_stats));
      let listOfThings = []
      listOfThings.push(this.lookUpAbility(this.selectedHero.signature))
      listOfThings.push(this.lookUpAbility(this.selectedSlot1))
      listOfThings.push(this.lookUpAbility(this.selectedSlot2))
      listOfThings.push(this.lookUpAbility(this.selectedSlot3))
      listOfThings.push(this.lookUpAbility(this.selectedSlot4))
      listOfThings.push(this.lookUpTalent(this.selectedLvl1))
      if ( this.level >= 2 ){
        listOfThings.push(this.lookUpTalent(this.selectedLvl2))
      }
      if ( this.level >= 3) {
        listOfThings.push(this.lookUpTalent(this.selectedLvl3))
      }
      if ( this.level >= 4) {
        listOfThings.push(this.lookUpTalent(this.selectedLvl4))
      }
      listOfThings.push(this.lookUpGem(this.selectedSapp1))
      listOfThings.push(this.lookUpGem(this.selectedSapp2))
      listOfThings.push(this.lookUpGem(this.selectedRuby1))
      listOfThings.push(this.lookUpGem(this.selectedRuby2))
      listOfThings.push(this.lookUpGem(this.selectedPris1))
      listOfThings.push(this.lookUpGem(this.selectedPris2))
      for ( let thing of listOfThings ){
        if(thing.stats){
          for( let key of Object.keys(thing.stats) ){
            let val = thing.stats[key];            
            if( !stats.hasOwnProperty(key) ){
              stats[key] = 0;
            }
            if( Number.isFinite(val) ){
              stats[key] += (thing.hasOwnProperty('name') && thing.name.indexOf('Empowering') == 0 ) ? val * this.level : val;
            }else{
              stats[key] = val;
            }
            
          }
          
        }
      }
      return stats;
    },
    selectedHero: function() {
      let selHero = { "signature": 0 };
      for ( let hero of this.heroes){
        if ( hero.id == this.selectedHeroId){
          selHero = hero;
          break;
        }
      }
      return selHero
    },
    computedId: function() {
      let retVal = '';
      retVal += this.toBase32(this.selectedHeroId)
      retVal += this.toBase32(this.selectedSlot1)
      retVal += this.toBase32(this.selectedSlot2)
      retVal += this.toBase32(this.selectedSlot3)
      retVal += this.toBase32(this.selectedSlot4)
      retVal += this.toBase32(this.selectedLvl1)
      retVal += this.toBase32(this.selectedLvl2)
      retVal += this.toBase32(this.selectedLvl3)
      retVal += this.toBase32(this.selectedLvl4)
      retVal += this.toBase32(this.selectedSapp1)
      retVal += this.toBase32(this.selectedSapp2)
      retVal += this.toBase32(this.selectedRuby1)
      retVal += this.toBase32(this.selectedRuby2)
      retVal += this.toBase32(this.selectedPris1)
      retVal += this.toBase32(this.selectedPris2)
      return retVal;
    },
    shareLinkUrl: function(){
      return location.protocol + '//' + location.host + location.pathname
    }
  },
  methods: {
    formatKey: function(key){
      let f = key.split('_');
      f = f.map( x => x.charAt(0).toUpperCase() + x.slice(1) );
      return f.join(' ');
    },
    defaultAbilities: function(theClass) {
      for(let schoolName of Object.keys(this.classes)){
        let school = this.classes[schoolName];
        for(let c of Object.keys(school)){
          if ( c == theClass ){
            return school[c];
          }
        }
      }
    },
    toBase32(x){
      let xString = (x) ? x.toString(32) : '0';
      if (xString.length % 2) {
        xString = '0' + xString;
      }
      return xString
    },
    fromBase32(xString){
      try {
        return parseInt(xString, 32);
      }catch(e){
        return 0;
      }
    },
    setDefaultSelectedSlots() {
      let thisHero = this.selectedHero
      this.selectedSlot1 = thisHero.abilities['1'];
      this.selectedSlot2 = thisHero.abilities['2'];
      this.selectedSlot3 = thisHero.abilities['3'];
      this.selectedSlot4 = thisHero.abilities['4'];
      this.$router.push('/' + this.computedId)
    },
    setSelectedSlotAbility(slot, abilityId){
      switch(slot){
        case 1:
          this.selectedSlot1 = abilityId;
          break;
        case 2:
          this.selectedSlot2 = abilityId;
          break;
        case 3:
          this.selectedSlot3 = abilityId;
          break;
        case 4:
          this.selectedSlot4 = abilityId;
          break;
      }
    },
    getSelectedSlotAbility(slot){
      let retVal = -1
      switch(slot){
        case 1:
          retVal = this.selectedSlot1;
          break;
        case 2:
          retVal = this.selectedSlot2;
          break;
        case 3:
          retVal = this.selectedSlot3;
          break;
        case 4:
          retVal = this.selectedSlot4;
          break;
      }
      return retVal;
    },
    handleSlotChange(e){
      let isAbilityAlreadyChosen = ['', this.selectedSlot1, this.selectedSlot2, this.selectedSlot3, this.selectedSlot4].indexOf(e.abilityId)
      if (isAbilityAlreadyChosen > -1){
        if(e.slot != isAbilityAlreadyChosen){
          this.setSelectedSlotAbility(isAbilityAlreadyChosen, this.getSelectedSlotAbility(e.slot))
        }
      }
      this.setSelectedSlotAbility(e.slot, e.abilityId)
      
      this.$router.push('/' + this.computedId)
    },
    handleTalentChange(e){
      switch(e.level){
        case 1:
          this.selectedLvl1 = e.talentId
          break;
        case 2:
          this.selectedLvl2 = e.talentId
          break;
        case 3:
          this.selectedLvl3 = e.talentId
          break;
        case 4:
          this.selectedLvl4 = e.talentId
          break;
      }
      this.$router.push('/' + this.computedId)
    },
    handleGemChange(e){
      switch(e.slot){
        case 's1':
          this.selectedSapp1 = e.gemId
          break;
        case 's2':
          this.selectedSapp2 = e.gemId
          break;
        case 'r1':
          this.selectedRuby1 = e.gemId
          break;
        case 'r2':
          this.selectedRuby2 = e.gemId
          break;
        case 'p1':
          this.selectedPris1 = e.gemId
          break;
        case 'p2':
          this.selectedPris2 = e.gemId
          break;
      }
      this.$router.push('/' + this.computedId)
    },
    parseRouterId(routerId, index, defaultValue){
      try{
        let idSubstr = routerId.substr(index*2, 2)
        return this.fromBase32(idSubstr);
      }catch(err){
        return defaultValue
      }
      
    },
    toggleShare(){
      this.showShare = !this.showShare
    },
    lookUpAbility(id){
      let retVal = {}
      for( let a of this.abilities ){
        if( a.id == id){
          retVal = a;
          break;
        }
      }
      return retVal;
    },
    lookUpTalent(id){
      let retVal = {}
      for( let a of this.talents ){
        if( a.id == id){
          retVal = a;
          break;
        }
      }
      return retVal;
    },
    lookUpGem(id){
      let retVal = {}
      for( let a of this.gems ){
        if( a.id == id){
          retVal = a;
          break;
        }
      }
      return retVal;
    },
    gotoExport(){
      this.showExport = true;
    },
    doExport(){
      window.location=`https://breach.gamepedia.com/Build:${this.exportName}?action=edit&section=new&nosummary=true&preload=Template:PreloadCharacterBuild&preloadparams%5b%5d=${this.computedId}&preloadparams%5b%5d=${this.selectedHero.name}`
    },
    cancelExport(){
      this.showExport = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.sharelink {
  clear: right; 
  font-family: 'Lucida Console'; 
  float: right; 
  border: 1px solid #eee; 
  background-color: #222; 
  padding: .3em;
}
a.sharelink  {
  color: #B3B4B7;
}
select {
  height: 2em;
  font-size: 1em;
} 
label {
  display: block;
  width: 4.5em;
  float: left;
  clear: both;
  margin-top: .25em;
  margin-bottom: 1em;
}

fieldset {
  margin-top: 2em;
}
button {
  background-color: rgb(221, 221, 221);
}
</style>
