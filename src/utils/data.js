export const options={shape:[['pebbles','Pebbles','● ●'],['lumpy','Lumpy','🪨'],['sausage','Sausage','🥖'],['smooth','Smooth','〰'],['blobs','Blobs','●'],['mushy','Mushy','☁'],['liquid','Liquid','💧']],color:[['dark-brown','Dark brown','#503022'],['brown','Brown','#92603e'],['light-brown','Light brown','#c59364'],['yellow','Yellow','#eac850'],['green','Green','#698e55'],['black','Black','#24232b'],['red','Red','#d94b50'],['other','Other','conic-gradient(#ed668e,#79b2dd,#eac850,#ed668e)']],size:[['tiny','Tiny','💩'],['small','Small','💩'],['medium','Medium','💩'],['large','Large','💩'],['huge','Absolute unit','💩']],consistency:[['hard','Hard'],['firm','Firm'],['normal','Normal'],['soft','Soft'],['mushy','Mushy'],['liquid','Liquid']],amount:[['little','A little','💩'],['normal','Normal','💩💩'],['lot','A lot','💩💩💩'],['legendary','Legendary','🏆']],experience:[['easy','Easy','😌'],['fine','Fine','🙂'],['meh','Meh','😐'],['difficult','Difficult','😖'],['help','Send help','🔥']]};
export const label=(type,id)=>options[type]?.find(x=>x[0]===id)?.[1]||'Not specified';
export const dateKey=(d)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const parseDate=(s)=>new Date(Number(s.slice(0,4)),Number(s.slice(5,7))-1,Number(s.slice(8,10)),12);
export const prettyDate=(s)=>parseDate(s).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
export const prettyTime=(s)=>new Date(`2000-01-01T${s}`).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
export function calendarDays(year,month){const offset=new Date(year,month,1).getDay(),n=new Date(year,month+1,0).getDate();return Array.from({length:Math.ceil((offset+n)/7)*7},(_,i)=>i>=offset&&i<offset+n?dateKey(new Date(year,month,i-offset+1)):null);}
export function statistics(entries,today=new Date()){
 const key=dateKey(today),month=key.slice(0,7),start=new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay()),wk=dateKey(start);
 const past=entries.filter(e=>e.date<=key),monthly=past.filter(e=>e.date.startsWith(month));
 const common=(field)=>{const counts={};monthly.forEach(e=>{if(e[field])counts[e[field]]=(counts[e[field]]||0)+1});return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0]};
 const days=new Set(past.map(e=>e.date));let cursor=parseDate(key),streak=0;if(!days.has(key))cursor.setDate(cursor.getDate()-1);while(days.has(dateKey(cursor))){streak++;cursor.setDate(cursor.getDate()-1)}
 const hours={};monthly.forEach(e=>{const h=Number(e.time.slice(0,2));hours[h]=(hours[h]||0)+1});const hour=Object.entries(hours).sort((a,b)=>b[1]-a[1])[0]?.[0];
 return {week:past.filter(e=>e.date>=wk).length,month:monthly.length,average:(monthly.length/today.getDate()).toFixed(1),shape:common('shape'),color:common('color'),hour:hour===undefined?'—':`${prettyTime(`${String(hour).padStart(2,'0')}:00`)} – ${prettyTime(`${String((Number(hour)+1)%24).padStart(2,'0')}:00`)}`,streak,monthly};
}
