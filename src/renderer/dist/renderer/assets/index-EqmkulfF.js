import{vec3 as d,quat as ue,vec4 as Bt,mat4 as H,mat3 as Ut}from"gl-matrix";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();var Ze=(t=>(t[t.WrapWidth=1]="WrapWidth",t[t.WrapHeight=2]="WrapHeight",t))(Ze||{}),z=(t=>(t[t.None=0]="None",t[t.Transparent=1]="Transparent",t[t.Blend=2]="Blend",t[t.Additive=3]="Additive",t[t.AddAlpha=4]="AddAlpha",t[t.Modulate=5]="Modulate",t[t.Modulate2x=6]="Modulate2x",t))(z||{}),ae=(t=>(t[t.DontInterp=0]="DontInterp",t[t.Linear=1]="Linear",t[t.Hermite=2]="Hermite",t[t.Bezier=3]="Bezier",t))(ae||{}),Ee=(t=>(t[t.Unshaded=1]="Unshaded",t[t.SphereEnvMap=2]="SphereEnvMap",t[t.TwoSided=16]="TwoSided",t[t.Unfogged=32]="Unfogged",t[t.NoDepthTest=64]="NoDepthTest",t[t.NoDepthSet=128]="NoDepthSet",t))(Ee||{}),Er=(t=>(t[t.ConstantColor=1]="ConstantColor",t[t.SortPrimsFarZ=16]="SortPrimsFarZ",t[t.FullResolution=32]="FullResolution",t))(Er||{}),Ar=(t=>(t[t.DropShadow=1]="DropShadow",t[t.Color=2]="Color",t))(Ar||{}),he=(t=>(t[t.DontInheritTranslation=1]="DontInheritTranslation",t[t.DontInheritRotation=2]="DontInheritRotation",t[t.DontInheritScaling=4]="DontInheritScaling",t[t.Billboarded=8]="Billboarded",t[t.BillboardedLockX=16]="BillboardedLockX",t[t.BillboardedLockY=32]="BillboardedLockY",t[t.BillboardedLockZ=64]="BillboardedLockZ",t[t.CameraAnchored=128]="CameraAnchored",t))(he||{}),Xe=(t=>(t[t.Helper=0]="Helper",t[t.Bone=256]="Bone",t[t.Light=512]="Light",t[t.EventObject=1024]="EventObject",t[t.Attachment=2048]="Attachment",t[t.ParticleEmitter=4096]="ParticleEmitter",t[t.CollisionShape=8192]="CollisionShape",t[t.RibbonEmitter=16384]="RibbonEmitter",t))(Xe||{}),it=(t=>(t[t.Box=0]="Box",t[t.Sphere=2]="Sphere",t))(it||{}),Ur=(t=>(t[t.EmitterUsesMDL=32768]="EmitterUsesMDL",t[t.EmitterUsesTGA=65536]="EmitterUsesTGA",t))(Ur||{}),ht=(t=>(t[t.Unshaded=32768]="Unshaded",t[t.SortPrimsFarZ=65536]="SortPrimsFarZ",t[t.LineEmitter=131072]="LineEmitter",t[t.Unfogged=262144]="Unfogged",t[t.ModelSpace=524288]="ModelSpace",t[t.XYQuad=1048576]="XYQuad",t))(ht||{}),xe=(t=>(t[t.Blend=0]="Blend",t[t.Additive=1]="Additive",t[t.Modulate=2]="Modulate",t[t.Modulate2x=3]="Modulate2x",t[t.AlphaKey=4]="AlphaKey",t))(xe||{}),k=(t=>(t[t.Head=1]="Head",t[t.Tail=2]="Tail",t))(k||{}),yr=(t=>(t[t.Omnidirectional=0]="Omnidirectional",t[t.Directional=1]="Directional",t[t.Ambient=2]="Ambient",t))(yr||{}),At=(t=>(t[t.Unshaded=32768]="Unshaded",t[t.SortPrimsFarZ=65536]="SortPrimsFarZ",t[t.Unfogged=262144]="Unfogged",t))(At||{});function mt(t,e,i){const r=e[0],n=e[1],o=e[2],s=e[3],a=r+r,f=n+n,l=o+o,u=r*a,g=r*f,S=r*l,m=n*f,T=n*l,b=o*l,w=s*a,c=s*f,v=s*l,h=i[0],B=i[1],C=i[2];return t[0]=1-(m+b),t[1]=g+v,t[2]=S-c,t[3]=0,t[4]=g-v,t[5]=1-(u+b),t[6]=T+w,t[7]=0,t[8]=S+c,t[9]=T-w,t[10]=1-(u+m),t[11]=0,t[12]=h-(t[0]*h+t[4]*B+t[8]*C),t[13]=B-(t[1]*h+t[5]*B+t[9]*C),t[14]=C-(t[2]*h+t[6]*B+t[10]*C),t[15]=1,t}function st(t,e){return t+Math.random()*(e-t)}function Vr(t){return t*Math.PI/180}function Le(t,e,i){const r=t.createShader(i);return t.shaderSource(r,e),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(alert(t.getShaderInfoLog(r)),null)}function Pe(t){return t instanceof WebGL2RenderingContext}const Rr={TextureID:0,NormalTextureID:1,ORMTextureID:2,EmissiveTextureID:3,TeamColorTextureID:4,ReflectionsTextureID:5},rr=["TextureID","NormalTextureID","ORMTextureID","EmissiveTextureID","TeamColorTextureID","ReflectionsTextureID"];let wr=class{constructor(e){this.str=e,this.pos=0}char(){return this.pos>=this.str.length&&W(this,"incorrect model data"),this.str[this.pos]}};function W(t,e=""){throw new Error(`SyntaxError, near ${t.pos}`+(e?", "+e:""))}function zt(t){if(t.char()==="/"&&t.str[t.pos+1]==="/"){for(t.pos+=2;t.pos<t.str.length&&t.str[++t.pos]!==`
`;);return++t.pos,!0}return!1}const _r=/\s/i;function He(t){for(;t.pos<t.str.length&&_r.test(t.char());)++t.pos}const Gr=/[a-z]/i,Ir=/[a-z0-9]/i;function _(t){if(!Gr.test(t.char()))return null;let e=t.char();for(++t.pos;Ir.test(t.char());)e+=t.str[t.pos++];return He(t),e}function q(t,e){t.char()===e&&(++t.pos,He(t))}function P(t,e){t.char()!==e&&W(t,`extected ${e}`),++t.pos,He(t)}function te(t){if(t.char()==='"'){const e=++t.pos;for(;t.char()!=='"';)++t.pos;++t.pos;const i=t.str.substring(e,t.pos-1);return He(t),i}return null}const Nr=/[-0-9]/,Or=/[-+.0-9e]/i;function R(t){if(Nr.test(t.char())){const e=t.pos;for(++t.pos;Or.test(t.char());)++t.pos;const i=parseFloat(t.str.substring(e,t.pos));return He(t),i}return null}function Q(t,e,i){if(t.char()!=="{")return null;for(e||(e=[],i=0),P(t,"{");t.char()!=="}";){const r=R(t);r===null&&W(t,"expected number"),e[i++]=r,q(t,",")}return P(t,"}"),e}function kr(t,e,i){if(t.char()!=="{")return 0;const r=i;for(P(t,"{");t.char()!=="}";){const n=R(t);n===null&&W(t,"expected number"),e[i++]=n,q(t,",")}return P(t,"}"),i-r}function Ft(t,e){if(t.char()!=="{")return e[0]=R(t),e;let i=0;for(P(t,"{");t.char()!=="}";){const r=R(t);r===null&&W(t,"expected number"),e[i++]=r,q(t,",")}return P(t,"}"),e}function dt(t){let e=null;const i={};for(t.char()!=="{"&&(e=te(t),e===null&&(e=R(t)),e===null&&W(t,"expected string or number")),P(t,"{");t.char()!=="}";){const r=_(t);if(r||W(t),r==="Interval"){const n=new Uint32Array(2);i[r]=Q(t,n,0)}else if(r==="MinimumExtent"||r==="MaximumExtent"){const n=new Float32Array(3);i[r]=Q(t,n,0)}else i[r]=Q(t)||te(t),i[r]===null&&(i[r]=R(t));q(t,",")}return P(t,"}"),[e,i]}function Xr(t,e){const[i,r]=dt(t);r.FormatVersion&&(e.Version=r.FormatVersion)}function Hr(t,e){const[i,r]=dt(t);e.Info=r,e.Info.Name=i}function zr(t,e){R(t),P(t,"{");const i=[];for(;t.char()!=="}";){_(t);const[r,n]=dt(t);n.Name=r,n.NonLooping="NonLooping"in n,n.MoveSpeed=n.MoveSpeed||0,n.Rarity=n.Rarity||0,i.push(n)}P(t,"}"),e.Sequences=i}function Wr(t,e){const i=[];for(R(t),P(t,"{");t.char()!=="}";){_(t);const[r,n]=dt(t);n.Flags=0,"WrapWidth"in n&&(n.Flags+=Ze.WrapWidth,delete n.WrapWidth),"WrapHeight"in n&&(n.Flags+=Ze.WrapHeight,delete n.WrapHeight),i.push(n)}P(t,"}"),e.Textures=i}const qr={0:1,1:1,2:3,3:4};function Yr(t,e,i,r){const n={Frame:e,Vector:null},o=i===0?Int32Array:Float32Array,s=qr[i];return n.Vector=Ft(t,new o(s)),P(t,","),(r===ae.Hermite||r===ae.Bezier)&&(_(t),n.InTan=Ft(t,new o(s)),P(t,","),_(t),n.OutTan=Ft(t,new o(s)),P(t,",")),n}function ee(t,e){const i={LineType:ae.DontInterp,GlobalSeqId:null,Keys:[]};R(t),P(t,"{");const r=_(t);for((r==="DontInterp"||r==="Linear"||r==="Hermite"||r==="Bezier")&&(i.LineType=ae[r]),P(t,",");t.char()!=="}";){const n=_(t);if(n==="GlobalSeqId")i[n]=R(t),P(t,",");else{const o=R(t);o===null&&W(t,"expected frame number or GlobalSeqId"),P(t,":"),i.Keys.push(Yr(t,o,e,i.LineType))}}return P(t,"}"),i}function Kr(t,e){const i={Alpha:null,TVertexAnimId:null,Shading:0,CoordId:0};for(P(t,"{");t.char()!=="}";){let r=_(t),n=!1;if(r||W(t),r==="static"&&(n=!0,r=_(t)),!n&&(r==="TextureID"||e.Version>=1100&&r in Rr))i[r]=ee(t,0);else if(!n&&r==="Alpha")i[r]=ee(t,1);else if(r==="Unshaded"||r==="SphereEnvMap"||r==="TwoSided"||r==="Unfogged"||r==="NoDepthTest"||r==="NoDepthSet")i.Shading|=Ee[r];else if(r==="FilterMode"){const o=_(t);(o==="None"||o==="Transparent"||o==="Blend"||o==="Additive"||o==="AddAlpha"||o==="Modulate"||o==="Modulate2x")&&(i.FilterMode=z[o])}else if(r==="TVertexAnimId")i.TVertexAnimId=R(t);else if(e.Version>=900&&r==="EmissiveGain")n?i[r]=R(t):i[r]=ee(t,1);else if(e.Version>=1e3&&r==="FresnelColor")if(n){const o=new Float32Array(3);i[r]=Q(t,o,0)}else i[r]=ee(t,2);else if(e.Version>=1e3&&(r==="FresnelOpacity"||r==="FresnelTeamColor"))n?i[r]=R(t):i[r]=ee(t,1);else{let o=R(t);o===null&&(o=_(t)),i[r]=o}q(t,","),zt(t),He(t)}return P(t,"}"),i}function $r(t,e){const i=[];for(R(t),P(t,"{");t.char()!=="}";){const r={RenderMode:0,Layers:[]};for(_(t),P(t,"{");t.char()!=="}";){const n=_(t);if(n||W(t),n==="Layer")r.Layers.push(Kr(t,e));else if(n==="PriorityPlane"||n==="RenderMode")r[n]=R(t);else if(n==="ConstantColor"||n==="SortPrimsFarZ"||n==="FullResolution")r.RenderMode|=Er[n];else if(e.Version>=900&&e.Version<=1100&&n==="Shader")r[n]=te(t);else throw new Error("Unknown material property "+n);q(t,",")}P(t,"}"),i.push(r)}P(t,"}"),e.Materials=i}function Mt(t,e,i){const r=R(t),n=new(i===1?Float32Array:Uint8Array)(r*e);P(t,"{");for(let o=0;o<r;++o)Q(t,n,o*e),P(t,",");return P(t,"}"),n}function jr(t,e){const i={Vertices:null,Normals:null,TVertices:[],VertexGroup:new Uint8Array(0),Faces:null,Groups:null,TotalGroupsCount:null,MinimumExtent:null,MaximumExtent:null,BoundsRadius:0,Anims:[],MaterialID:null,SelectionGroup:null,Unselectable:!1};for(P(t,"{");t.char()!=="}";){const r=_(t);if(r||W(t),r==="Vertices"||r==="Normals"||r==="TVertices"){let n=3;r==="TVertices"&&(n=2);const o=Mt(t,n,1);r==="TVertices"?i.TVertices.push(o):i[r]=o}else if(r==="VertexGroup")i[r]=new Uint8Array(i.Vertices.length/3),Q(t,i[r],0);else if(r==="Faces"){const n=R(t),o=R(t);let s=0;i.Faces=new Uint16Array(o),P(t,"{"),_(t)!=="Triangles"&&W(t,"unexpected faces type"),P(t,"{");for(let f=0;f<n;++f){const l=kr(t,i.Faces,s);l||W(t,"expected array"),s+=l,q(t,",")}(s!==o||o%3!==0)&&W(t,"mismatched faces array"),P(t,"}"),P(t,"}")}else if(r==="Groups"){const n=[];for(R(t),i.TotalGroupsCount=R(t),P(t,"{");t.char()!=="}";)_(t),n.push(Q(t)),q(t,",");P(t,"}"),i.Groups=n}else if(r==="MinimumExtent"||r==="MaximumExtent"){const n=new Float32Array(3);i[r]=Q(t,n,0),P(t,",")}else if(r==="BoundsRadius"||r==="MaterialID"||r==="SelectionGroup")i[r]=R(t),P(t,",");else if(r==="Anim"){const[n,o]=dt(t);o.Alpha===void 0&&(o.Alpha=1),i.Anims.push(o)}else r==="Unselectable"?(i.Unselectable=!0,P(t,",")):e.Version>=900&&(r==="LevelOfDetail"?(i.LevelOfDetail=R(t),P(t,",")):r==="Name"?(i.Name=te(t),P(t,",")):r==="Tangents"?i.Tangents=Mt(t,4,1):r==="SkinWeights"&&(i.SkinWeights=Mt(t,8,0)))}P(t,"}"),e.Geosets.push(i)}function Zr(t,e){const i={GeosetId:-1,Alpha:1,Color:null,Flags:0};for(P(t,"{");t.char()!=="}";){let r=_(t),n=!1;if(r||W(t),r==="static"&&(n=!0,r=_(t)),r==="Alpha")n?i.Alpha=R(t):i.Alpha=ee(t,1);else if(r==="Color")if(n){const o=new Float32Array(3);i.Color=Q(t,o,0),i.Color.reverse()}else{i.Color=ee(t,2);for(const o of i.Color.Keys)o.Vector.reverse(),o.InTan&&(o.InTan.reverse(),o.OutTan.reverse())}else r==="DropShadow"?i.Flags|=Ar[r]:i[r]=R(t);q(t,",")}P(t,"}"),e.GeosetAnims.push(i)}function Wt(t,e,i){const n={Name:te(t),ObjectId:null,Parent:null,PivotPoint:null,Flags:Xe[e]};for(P(t,"{");t.char()!=="}";){const o=_(t);if(o||W(t),o==="Translation"||o==="Rotation"||o==="Scaling"||o==="Visibility"){let s=2;o==="Rotation"?s=3:o==="Visibility"&&(s=1),n[o]=ee(t,s)}else if(o==="BillboardedLockZ"||o==="BillboardedLockY"||o==="BillboardedLockX"||o==="Billboarded"||o==="CameraAnchored")n.Flags|=he[o];else if(o==="DontInherit"){P(t,"{");const s=_(t);s==="Translation"?n.Flags|=he.DontInheritTranslation:s==="Rotation"?n.Flags|=he.DontInheritRotation:s==="Scaling"&&(n.Flags|=he.DontInheritScaling),P(t,"}")}else if(o==="Path")n[o]=te(t);else{let s=_(t)||R(t);(o==="GeosetId"&&s==="Multiple"||o==="GeosetAnimId"&&s==="None")&&(s=null),n[o]=s}q(t,","),zt(t),He(t)}return P(t,"}"),i.Nodes[n.ObjectId]=n,n}function Qr(t,e){const i=Wt(t,"Bone",e);e.Bones.push(i)}function Jr(t,e){const i=Wt(t,"Helper",e);e.Helpers.push(i)}function ei(t,e){const i=Wt(t,"Attachment",e);e.Attachments.push(i)}function ti(t,e){const i=R(t),r=[];P(t,"{");for(let n=0;n<i;++n)r.push(Q(t,new Float32Array(3),0)),P(t,",");P(t,"}"),e.PivotPoints=r}function ri(t,e){const r={Name:te(t),ObjectId:null,Parent:null,PivotPoint:null,EventTrack:null,Flags:Xe.EventObject};for(P(t,"{");t.char()!=="}";){const n=_(t);if(n||W(t),n==="EventTrack"){const o=R(t);r.EventTrack=Q(t,new Uint32Array(o),0)}else if(n==="Translation"||n==="Rotation"||n==="Scaling"){const o=n==="Rotation"?3:2;r[n]=ee(t,o)}else r[n]=R(t);q(t,",")}P(t,"}"),e.EventObjects.push(r),e.Nodes[r.ObjectId]=r}function ii(t,e){const r={Name:te(t),ObjectId:null,Parent:null,PivotPoint:null,Shape:it.Box,Vertices:null,Flags:Xe.CollisionShape};for(P(t,"{");t.char()!=="}";){const n=_(t);if(n||W(t),n==="Sphere")r.Shape=it.Sphere;else if(n==="Box")r.Shape=it.Box;else if(n==="Vertices"){const o=R(t),s=new Float32Array(o*3);P(t,"{");for(let a=0;a<o;++a)Q(t,s,a*3),P(t,",");P(t,"}"),r.Vertices=s}else if(n==="Translation"||n==="Rotation"||n==="Scaling"){const o=n==="Rotation"?3:2;r[n]=ee(t,o)}else r[n]=R(t);q(t,",")}P(t,"}"),e.CollisionShapes.push(r),e.Nodes[r.ObjectId]=r}function ni(t,e){const i=[],r=R(t);P(t,"{");for(let n=0;n<r;++n)_(t)==="Duration"&&i.push(R(t)),q(t,",");P(t,"}"),e.GlobalSequences=i}function oi(t){let e;for(;t.char()!==void 0&&t.char()!=="{";)++t.pos;for(e=1,++t.pos;t.char()!==void 0&&e>0;)t.char()==="{"?++e:t.char()==="}"&&--e,++t.pos;He(t)}function si(t,e){const i={ObjectId:null,Parent:null,Name:null,Flags:0};for(i.Name=te(t),P(t,"{");t.char()!=="}";){let r=_(t),n=!1;if(r||W(t),r==="static"&&(n=!0,r=_(t)),r==="ObjectId"||r==="Parent")i[r]=R(t);else if(r==="EmitterUsesMDL"||r==="EmitterUsesTGA")i.Flags|=Ur[r];else if(!n&&(r==="Visibility"||r==="Translation"||r==="Rotation"||r==="Scaling"||r==="EmissionRate"||r==="Gravity"||r==="Longitude"||r==="Latitude")){let o=2;r==="Visibility"||r==="EmissionRate"||r==="Gravity"||r==="Longitude"||r==="Latitude"?o=1:r==="Rotation"&&(o=3),i[r]=ee(t,o)}else if(r==="Particle"){for(P(t,"{");t.char()!=="}";){let o=_(t),s=!1;o==="static"&&(s=!0,o=_(t)),!s&&(o==="LifeSpan"||o==="InitVelocity")?i[o]=ee(t,1):o==="LifeSpan"||o==="InitVelocity"?i[o]=R(t):o==="Path"&&(i.Path=te(t)),q(t,",")}P(t,"}")}else i[r]=R(t);q(t,",")}P(t,"}"),e.ParticleEmitters.push(i)}function ai(t,e){const r={Name:te(t),ObjectId:null,Parent:null,PivotPoint:null,Flags:Xe.ParticleEmitter,FrameFlags:0};for(P(t,"{");t.char()!=="}";){let n=_(t),o=!1;if(n||W(t),n==="static"&&(o=!0,n=_(t)),!o&&(n==="Speed"||n==="Latitude"||n==="Visibility"||n==="EmissionRate"||n==="Width"||n==="Length"||n==="Translation"||n==="Rotation"||n==="Scaling"||n==="Gravity"||n==="Variation")){let s=2;switch(n){case"Rotation":s=3;break;case"Speed":case"Latitude":case"Visibility":case"EmissionRate":case"Width":case"Length":case"Gravity":case"Variation":s=1;break}r[n]=ee(t,s)}else if(n==="Variation"||n==="Gravity"||n==="ReplaceableId"||n==="PriorityPlane")r[n]=R(t);else if(n==="SortPrimsFarZ"||n==="Unshaded"||n==="LineEmitter"||n==="Unfogged"||n==="ModelSpace"||n==="XYQuad")r.Flags|=ht[n];else if(n==="Both")r.FrameFlags|=k.Head|k.Tail;else if(n==="Head"||n==="Tail")r.FrameFlags|=k[n];else if(n==="Squirt")r[n]=!0;else if(n==="DontInherit"){P(t,"{");const s=_(t);s==="Translation"?r.Flags|=he.DontInheritTranslation:s==="Rotation"?r.Flags|=he.DontInheritRotation:s==="Scaling"&&(r.Flags|=he.DontInheritScaling),P(t,"}")}else if(n==="SegmentColor"){const s=[];for(P(t,"{");t.char()!=="}";){_(t);const a=new Float32Array(3);Q(t,a,0);const f=a[0];a[0]=a[2],a[2]=f,s.push(a),q(t,",")}P(t,"}"),r.SegmentColor=s}else n==="Alpha"?(r.Alpha=new Uint8Array(3),Q(t,r.Alpha,0)):n==="ParticleScaling"?(r[n]=new Float32Array(3),Q(t,r[n],0)):n==="LifeSpanUVAnim"||n==="DecayUVAnim"||n==="TailUVAnim"||n==="TailDecayUVAnim"?(r[n]=new Uint32Array(3),Q(t,r[n],0)):n==="Transparent"||n==="Blend"||n==="Additive"||n==="AlphaKey"||n==="Modulate"||n==="Modulate2x"?r.FilterMode=xe[n]:r[n]=R(t);q(t,",")}P(t,"}"),e.ParticleEmitters2.push(r),e.Nodes[r.ObjectId]=r}function li(t,e){const i={Name:null,Position:null,FieldOfView:0,NearClip:0,FarClip:0,TargetPosition:null};for(i.Name=te(t),P(t,"{");t.char()!=="}";){const r=_(t);if(r||W(t),r==="Position")i.Position=new Float32Array(3),Q(t,i.Position,0);else if(r==="FieldOfView"||r==="NearClip"||r==="FarClip")i[r]=R(t);else if(r==="Target"){for(P(t,"{");t.char()!=="}";){const n=_(t);n==="Position"?(i.TargetPosition=new Float32Array(3),Q(t,i.TargetPosition,0)):n==="Translation"&&(i.TargetTranslation=ee(t,2)),q(t,",")}P(t,"}")}else(r==="Translation"||r==="Rotation")&&(i[r]=ee(t,r==="Rotation"?1:2));q(t,",")}P(t,"}"),e.Cameras.push(i)}function fi(t,e){const r={Name:te(t),ObjectId:null,Parent:null,PivotPoint:null,Flags:Xe.Light,LightType:0};for(P(t,"{");t.char()!=="}";){let n=_(t),o=!1;if(n||W(t),n==="static"&&(o=!0,n=_(t)),!o&&(n==="Visibility"||n==="Color"||n==="Intensity"||n==="AmbIntensity"||n==="AmbColor"||n==="Translation"||n==="Rotation"||n==="Scaling"||n==="AttenuationStart"||n==="AttenuationEnd")){let s=2;switch(n){case"Rotation":s=3;break;case"Visibility":case"Intensity":case"AmbIntensity":case"AttenuationStart":case"AttenuationEnd":s=1;break}if(r[n]=ee(t,s),n==="Color"||n==="AmbColor")for(const a of r[n].Keys)a.Vector.reverse(),a.InTan&&(a.InTan.reverse(),a.OutTan.reverse())}else if(n==="Omnidirectional"||n==="Directional"||n==="Ambient")r.LightType=yr[n];else if(n==="Color"||n==="AmbColor"){const s=new Float32Array(3);Q(t,s,0);const a=s[0];s[0]=s[2],s[2]=a,r[n]=s}else r[n]=R(t);q(t,",")}P(t,"}"),e.Lights.push(r),e.Nodes[r.ObjectId]=r}function hi(t,e){const i=[];for(R(t),P(t,"{");t.char()!=="}";){const r={};for(_(t),P(t,"{");t.char()!=="}";){const n=_(t);if(n||W(t),n==="Translation"||n==="Rotation"||n==="Scaling"){const o=n==="Rotation"?3:2;r[n]=ee(t,o)}else throw new Error("Unknown texture anim property "+n);q(t,",")}P(t,"}"),i.push(r)}P(t,"}"),e.TextureAnims=i}function ui(t,e){const r={Name:te(t),ObjectId:null,Parent:null,PivotPoint:null,Flags:Xe.RibbonEmitter,HeightAbove:null,HeightBelow:null,Alpha:null,Color:null,LifeSpan:null,TextureSlot:null,EmissionRate:null,Rows:null,Columns:null,MaterialID:0,Gravity:null,Visibility:null};for(P(t,"{");t.char()!=="}";){let n=_(t),o=!1;if(n||W(t),n==="static"&&(o=!0,n=_(t)),!o&&(n==="Visibility"||n==="HeightAbove"||n==="HeightBelow"||n==="Translation"||n==="Rotation"||n==="Scaling"||n==="Alpha"||n==="TextureSlot")){let s=2;switch(n){case"Rotation":s=3;break;case"Visibility":case"HeightAbove":case"HeightBelow":case"Alpha":s=1;break;case"TextureSlot":s=0;break}r[n]=ee(t,s)}else if(n==="Color"){const s=new Float32Array(3);Q(t,s,0);const a=s[0];s[0]=s[2],s[2]=a,r[n]=s}else r[n]=R(t);q(t,",")}P(t,"}"),e.RibbonEmitters.push(r),e.Nodes[r.ObjectId]=r}function ci(t,e){e.Version<900&&W(t,"Unexpected model chunk FaceFX");const r={Name:te(t),Path:""};for(P(t,"{");t.char()!=="}";){const n=_(t);n||W(t),n==="Path"&&(r.Path=te(t)),q(t,",")}P(t,"}"),e.FaceFX=e.FaceFX||[],e.FaceFX.push(r)}function di(t,e){e.Version<900&&W(t,"Unexpected model chunk BindPose");const i={Matrices:[]};P(t,"{"),_(t);const r=R(t);P(t,"{");for(let n=0;n<r;++n){const o=new Float32Array(12);Q(t,o,0),q(t,","),i.Matrices.push(o)}P(t,"}"),P(t,"}"),e.BindPoses=e.BindPoses||[],e.BindPoses.push(i)}function gi(t,e){e.Version<900&&W(t,"Unexpected model chunk ParticleEmitterPopcorn");const r={Name:te(t),ObjectId:null,Parent:null,PivotPoint:null,Flags:Xe.ParticleEmitter};for(P(t,"{");t.char()!=="}";){let n=_(t),o=!1;if(n||W(t),n==="static"&&(o=!0,n=_(t)),!o&&(n==="LifeSpan"||n==="EmissionRate"||n==="Speed"||n==="Color"||n==="Alpha"||n==="Visibility"||n==="Rotation"||n==="Scaling"||n==="Translation")){let s=2;switch(n){case"LifeSpan":case"EmissionRate":case"Speed":case"Alpha":case"Visibility":s=1;break}r[n]=ee(t,s)}else if(n==="LifeSpan"||n==="EmissionRate"||n==="Speed"||n==="Alpha")r[n]=R(t);else if(n==="Color"){const s=new Float32Array(3);r[n]=Q(t,s,0)}else n==="ReplaceableId"?r[n]=R(t):n==="Path"||n==="AnimVisibilityGuide"?r[n]=te(t):n==="Unshaded"||n==="SortPrimsFarZ"||n==="Unfogged"?n==="Unshaded"?r.Flags|=At.Unshaded:n==="Unfogged"?r.Flags|=At.Unfogged:n==="SortPrimsFarZ"&&(r.Flags|=At.SortPrimsFarZ):r[n]=R(t);q(t,",")}P(t,"}"),e.ParticleEmitterPopcorns=e.ParticleEmitterPopcorns||[],e.ParticleEmitterPopcorns.push(r),e.Nodes[r.ObjectId]=r}const ir={Version:Xr,Model:Hr,Sequences:zr,Textures:Wr,Materials:$r,Geoset:jr,GeosetAnim:Zr,Bone:Qr,Helper:Jr,Attachment:ei,PivotPoints:ti,EventObject:ri,CollisionShape:ii,GlobalSequences:ni,ParticleEmitter:si,ParticleEmitter2:ai,Camera:li,Light:fi,TextureAnims:hi,RibbonEmitter:ui,FaceFX:ci,BindPose:di,ParticleEmitterPopcorn:gi};function mi(t){const e=new wr(t),i={Version:800,Info:{Name:"",MinimumExtent:null,MaximumExtent:null,BoundsRadius:0,BlendTime:150},Sequences:[],GlobalSequences:[],Textures:[],Materials:[],TextureAnims:[],Geosets:[],GeosetAnims:[],Bones:[],Helpers:[],Attachments:[],EventObjects:[],ParticleEmitters:[],ParticleEmitters2:[],Cameras:[],Lights:[],RibbonEmitters:[],CollisionShapes:[],PivotPoints:[],Nodes:[]};for(;e.pos<e.str.length;){for(;zt(e););const r=_(e);if(r)r in ir?ir[r](e,i):oi(e);else break}for(let r=0;r<i.Nodes.length;++r)i.PivotPoints[r]&&(i.Nodes[r].PivotPoint=i.PivotPoints[r]);return i}const Vt=!0,ke=-1,pi={0:1,1:1,2:3,3:4};class vi{constructor(e){this.ab=e,this.pos=0,this.length=e.byteLength,this.view=new DataView(this.ab),this.uint=new Uint8Array(this.ab)}keyword(){const e=String.fromCharCode(this.uint[this.pos],this.uint[this.pos+1],this.uint[this.pos+2],this.uint[this.pos+3]);return this.pos+=4,e}expectKeyword(e,i){if(this.keyword()!==e)throw new Error(i)}uint8(){return this.view.getUint8(this.pos++)}uint16(){const e=this.view.getUint16(this.pos,Vt);return this.pos+=2,e}int32(){const e=this.view.getInt32(this.pos,Vt);return this.pos+=4,e}float32(){const e=this.view.getFloat32(this.pos,Vt);return this.pos+=4,e}float32Array(e){const i=new Float32Array(e);for(let r=0;r<e;++r)i[r]=this.float32();return i}uint8Array(e){const i=new Uint8Array(e);for(let r=0;r<e;++r)i[r]=this.uint8();return i}str(e){let i=e;for(;this.uint[this.pos+i-1]===0&&i>0;)--i;const r=String.fromCharCode.apply(String,this.uint.slice(this.pos,this.pos+i));return this.pos+=e,r}animVector(e){const i={Keys:[]},r=e===0,n=pi[e],o=this.int32();i.LineType=this.int32(),i.GlobalSeqId=this.int32(),i.GlobalSeqId===ke&&(i.GlobalSeqId=null);for(let s=0;s<o;++s){const a={};a.Frame=this.int32(),r?a.Vector=new Int32Array(n):a.Vector=new Float32Array(n);for(let f=0;f<n;++f)r?a.Vector[f]=this.int32():a.Vector[f]=this.float32();if(i.LineType===ae.Hermite||i.LineType===ae.Bezier)for(const f of["InTan","OutTan"]){a[f]=new Float32Array(n);for(let l=0;l<n;++l)r?a[f][l]=this.int32():a[f][l]=this.float32()}i.Keys.push(a)}return i}}function yt(t,e){t.BoundsRadius=e.float32();for(const i of["MinimumExtent","MaximumExtent"]){t[i]=new Float32Array(3);for(let r=0;r<3;++r)t[i][r]=e.float32()}}function xi(t,e){t.Version=e.int32()}const bi=336;function Ti(t,e){t.Info.Name=e.str(bi),e.int32(),yt(t.Info,e),t.Info.BlendTime=e.int32()}const Pi=80;function Si(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n=e.str(Pi),o={};o.Name=n;const s=new Uint32Array(2);s[0]=e.int32(),s[1]=e.int32(),o.Interval=s,o.MoveSpeed=e.float32(),o.NonLooping=e.int32()>0,o.Rarity=e.float32(),e.int32(),yt(o,e),t.Sequences.push(o)}}function Ei(t,e,i){const r=e.pos;for(;e.pos<r+i;){e.int32();const n={Layers:[]};n.PriorityPlane=e.int32(),n.RenderMode=e.int32(),t.Version>=900&&t.Version<1100&&(n.Shader=e.str(80)),e.expectKeyword("LAYS","Incorrect materials format");const o=e.int32();for(let s=0;s<o;++s){const a=e.pos,f=e.int32(),l={};if(l.FilterMode=e.int32(),l.Shading=e.int32(),l.TextureID=e.int32(),l.TVertexAnimId=e.int32(),l.TVertexAnimId===ke&&(l.TVertexAnimId=null),l.CoordId=e.int32(),l.Alpha=e.float32(),t.Version>=900&&(l.EmissiveGain=e.float32(),t.Version>=1e3&&(l.FresnelColor=e.float32Array(3),l.FresnelOpacity=e.float32(),l.FresnelTeamColor=e.float32())),t.Version>=1100){l.ShaderTypeId=e.int32();const u=e.int32();for(let g=0;g<u;++g){const S=e.int32();e.int32();const m=g;e.keyword()==="KMTF"?l[rr[m]]=e.animVector(0):(l[rr[m]]=S,e.pos-=4)}}for(;e.pos<a+f;){const u=e.keyword();if(u==="KMTA")l.Alpha=e.animVector(1);else if(u==="KMTF")l.TextureID=e.animVector(0);else if(u==="KMTE"&&t.Version>=900)l.EmissiveGain=e.animVector(1);else if(u==="KFC3"&&t.Version>=1e3)l.FresnelColor=e.animVector(2);else if(u==="KFCA"&&t.Version>=1e3)l.FresnelOpacity=e.animVector(1);else if(u==="KFTC"&&t.Version>=1e3)l.FresnelTeamColor=e.animVector(1);else throw new Error("Unknown layer chunk data "+u)}n.Layers.push(l)}t.Materials.push(n)}}const Ai=256;function Ui(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n={};n.ReplaceableId=e.int32(),n.Image=e.str(Ai),e.int32(),n.Flags=e.int32(),t.Textures.push(n)}}function yi(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n={};e.int32(),e.expectKeyword("VRTX","Incorrect geosets format");const o=e.int32();n.Vertices=new Float32Array(o*3);for(let c=0;c<o*3;++c)n.Vertices[c]=e.float32();e.expectKeyword("NRMS","Incorrect geosets format");const s=e.int32();n.Normals=new Float32Array(s*3);for(let c=0;c<s*3;++c)n.Normals[c]=e.float32();e.expectKeyword("PTYP","Incorrect geosets format");const a=e.int32();for(let c=0;c<a;++c)if(e.int32()!==4)throw new Error("Incorrect geosets format");e.expectKeyword("PCNT","Incorrect geosets format");const f=e.int32();for(let c=0;c<f;++c)e.int32();e.expectKeyword("PVTX","Incorrect geosets format");const l=e.int32();n.Faces=new Uint16Array(l);for(let c=0;c<l;++c)n.Faces[c]=e.uint16();e.expectKeyword("GNDX","Incorrect geosets format");const u=e.int32();n.VertexGroup=new Uint8Array(u);for(let c=0;c<u;++c)n.VertexGroup[c]=e.uint8();e.expectKeyword("MTGC","Incorrect geosets format");const g=e.int32();n.Groups=[];for(let c=0;c<g;++c)n.Groups[c]=new Array(e.int32());e.expectKeyword("MATS","Incorrect geosets format"),n.TotalGroupsCount=e.int32();let S=0,m=0;for(let c=0;c<n.TotalGroupsCount;++c)S>=n.Groups[m].length&&(S=0,m++),n.Groups[m][S++]=e.int32();n.MaterialID=e.int32(),n.SelectionGroup=e.int32(),n.Unselectable=e.int32()>0,t.Version>=900&&(n.LevelOfDetail=e.int32(),n.Name=e.str(80)),yt(n,e);const T=e.int32();n.Anims=[];for(let c=0;c<T;++c){const v={};yt(v,e),n.Anims.push(v)}let b=e.keyword();if(t.Version>=900)for(;;){if(e.pos>=e.length)throw new Error("Unexpected EOF");if(b==="TANG"){if(n.Tangents)throw new Error("Incorrect geoset, multiple Tangents");const c=e.int32();n.Tangents=e.float32Array(c*4)}else if(b==="SKIN"){if(n.SkinWeights)throw new Error("Incorrect geoset, multiple SkinWeights");const c=e.int32();n.SkinWeights=e.uint8Array(c)}else if(b==="UVAS")break;b=e.keyword()}else if(b!=="UVAS")throw new Error("Incorrect geosets format");const w=e.int32();n.TVertices=[];for(let c=0;c<w;++c){e.expectKeyword("UVBS","Incorrect geosets format");const v=e.int32(),h=new Float32Array(v*2);for(let B=0;B<v*2;++B)h[B]=e.float32();n.TVertices.push(h)}t.Geosets.push(n)}}function Ci(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n=e.pos,o=e.int32(),s={};s.Alpha=e.float32(),s.Flags=e.int32(),s.Color=new Float32Array(3);for(let a=0;a<3;++a)s.Color[a]=e.float32();for(s.GeosetId=e.int32(),s.GeosetId===ke&&(s.GeosetId=null);e.pos<n+o;){const a=e.keyword();if(a==="KGAO")s.Alpha=e.animVector(1);else if(a==="KGAC")s.Color=e.animVector(2);else throw new Error("Incorrect GeosetAnim chunk data "+a)}t.GeosetAnims.push(s)}}const Bi=80;function Fe(t,e,i){const r=i.pos,n=i.int32();for(e.Name=i.str(Bi),e.ObjectId=i.int32(),e.ObjectId===ke&&(e.ObjectId=null),e.Parent=i.int32(),e.Parent===ke&&(e.Parent=null),e.Flags=i.int32();i.pos<r+n;){const o=i.keyword();if(o==="KGTR")e.Translation=i.animVector(2);else if(o==="KGRT")e.Rotation=i.animVector(3);else if(o==="KGSC")e.Scaling=i.animVector(2);else throw new Error("Incorrect node chunk data "+o)}t.Nodes[e.ObjectId]=e}function Di(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n={};Fe(t,n,e),n.GeosetId=e.int32(),n.GeosetId===ke&&(n.GeosetId=null),n.GeosetAnimId=e.int32(),n.GeosetAnimId===ke&&(n.GeosetAnimId=null),t.Bones.push(n)}}function Li(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n={};Fe(t,n,e),t.Helpers.push(n)}}const Fi=256;function Mi(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n=e.pos,o=e.int32(),s={};Fe(t,s,e),s.Path=e.str(Fi),e.int32(),s.AttachmentID=e.int32(),e.pos<n+o&&(e.expectKeyword("KATV","Incorrect attachment chunk data"),s.Visibility=e.animVector(1)),t.Attachments.push(s)}}function Vi(t,e,i){const r=i/12;for(let n=0;n<r;++n)t.PivotPoints[n]=new Float32Array(3),t.PivotPoints[n][0]=e.float32(),t.PivotPoints[n][1]=e.float32(),t.PivotPoints[n][2]=e.float32()}function Ri(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n={};Fe(t,n,e),e.expectKeyword("KEVT","Incorrect EventObject chunk data");const o=e.int32();n.EventTrack=new Uint32Array(o),e.int32();for(let s=0;s<o;++s)n.EventTrack[s]=e.int32();t.EventObjects.push(n)}}function wi(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n={};Fe(t,n,e),n.Shape=e.int32(),n.Shape===it.Box?n.Vertices=new Float32Array(6):n.Vertices=new Float32Array(3);for(let o=0;o<n.Vertices.length;++o)n.Vertices[o]=e.float32();n.Shape===it.Sphere&&(n.BoundsRadius=e.float32()),t.CollisionShapes.push(n)}}function _i(t,e,i){const r=e.pos;for(t.GlobalSequences=[];e.pos<r+i;)t.GlobalSequences.push(e.int32())}const Gi=256;function Ii(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n=e.pos,o=e.int32(),s={};for(Fe(t,s,e),s.EmissionRate=e.float32(),s.Gravity=e.float32(),s.Longitude=e.float32(),s.Latitude=e.float32(),s.Path=e.str(Gi),e.int32(),s.LifeSpan=e.float32(),s.InitVelocity=e.float32();e.pos<n+o;){const a=e.keyword();if(a==="KPEV")s.Visibility=e.animVector(1);else if(a==="KPEE")s.EmissionRate=e.animVector(1);else if(a==="KPEG")s.Gravity=e.animVector(1);else if(a==="KPLN")s.Longitude=e.animVector(1);else if(a==="KPLT")s.Latitude=e.animVector(1);else if(a==="KPEL")s.LifeSpan=e.animVector(1);else if(a==="KPES")s.InitVelocity=e.animVector(1);else throw new Error("Incorrect particle emitter chunk data "+a)}t.ParticleEmitters.push(s)}}function Ni(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n=e.pos,o=e.int32(),s={};Fe(t,s,e),s.Speed=e.float32(),s.Variation=e.float32(),s.Latitude=e.float32(),s.Gravity=e.float32(),s.LifeSpan=e.float32(),s.EmissionRate=e.float32(),s.Width=e.float32(),s.Length=e.float32(),s.FilterMode=e.int32(),s.Rows=e.int32(),s.Columns=e.int32();const a=e.int32();s.FrameFlags=0,(a===0||a===2)&&(s.FrameFlags|=k.Head),(a===1||a===2)&&(s.FrameFlags|=k.Tail),s.TailLength=e.float32(),s.Time=e.float32(),s.SegmentColor=[];for(let f=0;f<3;++f){s.SegmentColor[f]=new Float32Array(3);for(let l=0;l<3;++l)s.SegmentColor[f][l]=e.float32()}s.Alpha=new Uint8Array(3);for(let f=0;f<3;++f)s.Alpha[f]=e.uint8();s.ParticleScaling=new Float32Array(3);for(let f=0;f<3;++f)s.ParticleScaling[f]=e.float32();for(const f of["LifeSpanUVAnim","DecayUVAnim","TailUVAnim","TailDecayUVAnim"]){s[f]=new Uint32Array(3);for(let l=0;l<3;++l)s[f][l]=e.int32()}for(s.TextureID=e.int32(),s.TextureID===ke&&(s.TextureID=null),s.Squirt=e.int32()>0,s.PriorityPlane=e.int32(),s.ReplaceableId=e.int32();e.pos<n+o;){const f=e.keyword();if(f==="KP2V")s.Visibility=e.animVector(1);else if(f==="KP2E")s.EmissionRate=e.animVector(1);else if(f==="KP2W")s.Width=e.animVector(1);else if(f==="KP2N")s.Length=e.animVector(1);else if(f==="KP2S")s.Speed=e.animVector(1);else if(f==="KP2L")s.Latitude=e.animVector(1);else if(f==="KP2G")s.Gravity=e.animVector(1);else if(f==="KP2R")s.Variation=e.animVector(1);else throw new Error("Incorrect particle emitter2 chunk data "+f)}t.ParticleEmitters2.push(s)}}const Oi=80;function ki(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n=e.pos,o=e.int32(),s={};for(s.Name=e.str(Oi),s.Position=new Float32Array(3),s.Position[0]=e.float32(),s.Position[1]=e.float32(),s.Position[2]=e.float32(),s.FieldOfView=e.float32(),s.FarClip=e.float32(),s.NearClip=e.float32(),s.TargetPosition=new Float32Array(3),s.TargetPosition[0]=e.float32(),s.TargetPosition[1]=e.float32(),s.TargetPosition[2]=e.float32();e.pos<n+o;){const a=e.keyword();if(a==="KCTR")s.Translation=e.animVector(2);else if(a==="KTTR")s.TargetTranslation=e.animVector(2);else if(a==="KCRL")s.Rotation=e.animVector(1);else throw new Error("Incorrect camera chunk data "+a)}t.Cameras.push(s)}}function Xi(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n=e.pos,o=e.int32(),s={};Fe(t,s,e),s.LightType=e.int32(),s.AttenuationStart=e.float32(),s.AttenuationEnd=e.float32(),s.Color=new Float32Array(3);for(let a=0;a<3;++a)s.Color[a]=e.float32();s.Intensity=e.float32(),s.AmbColor=new Float32Array(3);for(let a=0;a<3;++a)s.AmbColor[a]=e.float32();for(s.AmbIntensity=e.float32();e.pos<n+o;){const a=e.keyword();if(a==="KLAV")s.Visibility=e.animVector(1);else if(a==="KLAC")s.Color=e.animVector(2);else if(a==="KLAI")s.Intensity=e.animVector(1);else if(a==="KLBC")s.AmbColor=e.animVector(2);else if(a==="KLBI")s.AmbIntensity=e.animVector(1);else if(a==="KLAS")s.AttenuationStart=e.animVector(0);else if(a==="KLAE")s.AttenuationEnd=e.animVector(0);else throw new Error("Incorrect light chunk data "+a)}t.Lights.push(s)}}function Hi(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n=e.pos,o=e.int32(),s={};for(;e.pos<n+o;){const a=e.keyword();if(a==="KTAT")s.Translation=e.animVector(2);else if(a==="KTAR")s.Rotation=e.animVector(3);else if(a==="KTAS")s.Scaling=e.animVector(2);else throw new Error("Incorrect light chunk data "+a)}t.TextureAnims.push(s)}}function zi(t,e,i){const r=e.pos;for(;e.pos<r+i;){const n=e.pos,o=e.int32(),s={};Fe(t,s,e),s.HeightAbove=e.float32(),s.HeightBelow=e.float32(),s.Alpha=e.float32(),s.Color=new Float32Array(3);for(let a=0;a<3;++a)s.Color[a]=e.float32();for(s.LifeSpan=e.float32(),s.TextureSlot=e.int32(),s.EmissionRate=e.int32(),s.Rows=e.int32(),s.Columns=e.int32(),s.MaterialID=e.int32(),s.Gravity=e.float32();e.pos<n+o;){const a=e.keyword();if(a==="KRVS")s.Visibility=e.animVector(1);else if(a==="KRHA")s.HeightAbove=e.animVector(1);else if(a==="KRHB")s.HeightBelow=e.animVector(1);else if(a==="KRAL")s.Alpha=e.animVector(1);else if(a==="KRTX")s.TextureSlot=e.animVector(0);else throw new Error("Incorrect ribbon emitter chunk data "+a)}t.RibbonEmitters.push(s)}}function Wi(t,e,i){if(t.Version<900)throw new Error("Mismatched version chunk");const r=e.pos;for(t.FaceFX=t.FaceFX||[];e.pos<r+i;){const n={Name:"",Path:""};n.Name=e.str(80),n.Path=e.str(260),t.FaceFX.push(n)}}function qi(t,e,i){if(t.Version<900)throw new Error("Mismatched version chunk");const r=e.pos;t.BindPoses=t.BindPoses||[];const n=e.int32(),o={Matrices:[]};for(let s=0;s<n;++s){const a=e.float32Array(12);o.Matrices.push(a)}if(t.BindPoses.push(o),e.pos!==r+i)throw new Error("Mismatched BindPose data")}function Yi(t,e,i){if(t.Version<900)throw new Error("Mismatched version chunk");const r=e.pos;for(t.ParticleEmitterPopcorns=t.ParticleEmitterPopcorns||[];e.pos<r+i;){const n=e.pos,o=e.int32(),s={};for(Fe(t,s,e),s.LifeSpan=e.float32(),s.EmissionRate=e.float32(),s.Speed=e.float32(),s.Color=e.float32Array(3),s.Alpha=e.float32(),s.ReplaceableId=e.int32(),s.Path=e.str(260),s.AnimVisibilityGuide=e.str(260);e.pos<n+o;){const a=e.keyword();if(a==="KPPA")s.Alpha=e.animVector(1);else if(a==="KPPC")s.Color=e.animVector(2);else if(a==="KPPE")s.EmissionRate=e.animVector(1);else if(a==="KPPL")s.LifeSpan=e.animVector(1);else if(a==="KPPS")s.Speed=e.animVector(1);else if(a==="KPPV")s.Visibility=e.animVector(1);else throw new Error("Incorrect particle emitter popcorn chunk data "+a)}t.ParticleEmitterPopcorns.push(s)}}const nr={VERS:xi,MODL:Ti,SEQS:Si,MTLS:Ei,TEXS:Ui,GEOS:yi,GEOA:Ci,BONE:Di,HELP:Li,ATCH:Mi,PIVT:Vi,EVTS:Ri,CLID:wi,GLBS:_i,PREM:Ii,PRE2:Ni,CAMS:ki,LITE:Xi,TXAN:Hi,RIBB:zi,FAFX:Wi,BPOS:qi,CORN:Yi};function Ki(t){const e=new vi(t);if(e.keyword()!=="MDLX")throw new Error("Not a mdx model");const i={Version:800,Info:{Name:"",MinimumExtent:null,MaximumExtent:null,BoundsRadius:0,BlendTime:150},Sequences:[],GlobalSequences:[],Textures:[],Materials:[],TextureAnims:[],Geosets:[],GeosetAnims:[],Bones:[],Helpers:[],Attachments:[],EventObjects:[],ParticleEmitters:[],ParticleEmitters2:[],Cameras:[],Lights:[],RibbonEmitters:[],CollisionShapes:[],PivotPoints:[],Nodes:[]};for(;e.pos<e.length;){const r=e.keyword(),n=e.int32();r in nr?nr[r](i,e,n):e.pos+=n}for(let r=0;r<i.Nodes.length;++r)i.Nodes[r]&&i.PivotPoints[r]&&(i.Nodes[r].PivotPoint=i.PivotPoints[r]);return i.Info.NumGeosets=i.Geosets.length,i.Info.NumGeosetAnims=i.GeosetAnims.length,i.Info.NumBones=i.Bones.length,i.Info.NumLights=i.Lights.length,i.Info.NumAttachments=i.Attachments.length,i.Info.NumEvents=i.EventObjects.length,i.Info.NumParticleEmitters=i.ParticleEmitters.length,i.Info.NumParticleEmitters2=i.ParticleEmitters2.length,i.Info.NumRibbonEmitters=i.RibbonEmitters.length,i}var Cr=(t=>(t[t.BLP0=0]="BLP0",t[t.BLP1=1]="BLP1",t[t.BLP2=2]="BLP2",t))(Cr||{}),ut=(t=>(t[t.JPEG=0]="JPEG",t[t.Direct=1]="Direct",t))(ut||{}),$i=(function(){var e=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),i=4017,r=799,n=3406,o=2276,s=1567,a=3784,f=5793,l=2896;function u(){}function g(c,v){for(var h=0,B=[],C,x,E=16;E>0&&!c[E-1];)E--;B.push({children:[],index:0});var U=B[0],p;for(C=0;C<E;C++){for(x=0;x<c[C];x++){for(U=B.pop(),U.children[U.index]=v[h];U.index>0;)U=B.pop();for(U.index++,B.push(U);B.length<=C;)B.push(p={children:[],index:0}),U.children[U.index]=p.children,U=p;h++}C+1<E&&(B.push(p={children:[],index:0}),U.children[U.index]=p.children,U=p)}return B[0].children}function S(c,v,h){return 64*((c.blocksPerLine+1)*v+h)}function m(c,v,h,B,C,x,E,U,p){h.precision,h.samplesPerLine,h.scanLines;var I=h.mcusPerLine,F=h.progressive;h.maxH,h.maxV;var G=v,A=0,M=0;function D(){if(M>0)return M--,A>>M&1;if(A=c[v++],A==255){var V=c[v++];if(V)throw"unexpected marker: "+(A<<8|V).toString(16)}return M=7,A>>>7}function y(V){for(var O=V,X;(X=D())!==null;){if(O=O[X],typeof O=="number")return O;if(typeof O!="object")throw"invalid huffman sequence"}return null}function Y(V){for(var O=0;V>0;){var X=D();if(X===null)return;O=O<<1|X,V--}return O}function L(V){var O=Y(V);return O>=1<<V-1?O:O+(-1<<V)+1}function re(V,O){var X=y(V.huffmanTableDC),ve=X===0?0:L(X);V.blockData[O]=V.pred+=ve;for(var N=1;N<64;){var $=y(V.huffmanTableAC),fe=$&15,ce=$>>4;if(fe===0){if(ce<15)break;N+=16;continue}N+=ce;var ot=e[N];V.blockData[O+ot]=L(fe),N++}}function be(V,O){var X=y(V.huffmanTableDC),ve=X===0?0:L(X)<<p;V.blockData[O]=V.pred+=ve}function me(V,O){V.blockData[O]|=D()<<p}var oe=0;function Te(V,O){if(oe>0){oe--;return}for(var X=x,ve=E;X<=ve;){var N=y(V.huffmanTableAC),$=N&15,fe=N>>4;if($===0){if(fe<15){oe=Y(fe)+(1<<fe)-1;break}X+=16;continue}X+=fe;var ce=e[X];V.blockData[O+ce]=L($)*(1<<p),X++}}var ie=0,pe;function Ue(V,O){for(var X=x,ve=E,N=0;X<=ve;){var $=e[X];switch(ie){case 0:var fe=y(V.huffmanTableAC),ce=fe&15,N=fe>>4;if(ce===0)N<15?(oe=Y(N)+(1<<N),ie=4):(N=16,ie=1);else{if(ce!==1)throw"invalid ACn encoding";pe=L(ce),ie=N?2:3}continue;case 1:case 2:V.blockData[O+$]?V.blockData[O+$]+=D()<<p:(N--,N===0&&(ie=ie==2?3:0));break;case 3:V.blockData[O+$]?V.blockData[O+$]+=D()<<p:(V.blockData[O+$]=pe<<p,ie=0);break;case 4:V.blockData[O+$]&&(V.blockData[O+$]+=D()<<p);break}X++}ie===4&&(oe--,oe===0&&(ie=0))}function ye(V,O,X,ve,N){var $=X/I|0,fe=X%I,ce=$*V.v+ve,ot=fe*V.h+N,Lt=S(V,ce,ot);O(V,Lt)}function Ce(V,O,X){var ve=X/V.blocksPerLine|0,N=X%V.blocksPerLine,$=S(V,ve,N);O(V,$)}var se=B.length,le,j,Z,Me,Ae,_e;F?x===0?_e=U===0?be:me:_e=U===0?Te:Ue:_e=re;var ze=0,We,K;se==1?K=B[0].blocksPerLine*B[0].blocksPerColumn:K=I*h.mcusPerColumn,C||(C=K);for(var gt,nt;ze<K;){for(j=0;j<se;j++)B[j].pred=0;if(oe=0,se==1)for(le=B[0],Ae=0;Ae<C;Ae++)Ce(le,_e,ze),ze++;else for(Ae=0;Ae<C;Ae++){for(j=0;j<se;j++)for(le=B[j],gt=le.h,nt=le.v,Z=0;Z<nt;Z++)for(Me=0;Me<gt;Me++)ye(le,_e,ze,Z,Me);ze++}if(M=0,We=c[v]<<8|c[v+1],We<=65280)throw"marker was not found";if(We>=65488&&We<=65495)v+=2;else break}return v-G}function T(c,v,h){var B=c.quantizationTable,C,x,E,U,p,I,F,G,A,M;for(M=0;M<64;M++)h[M]=c.blockData[v+M]*B[M];for(M=0;M<8;++M){var D=8*M;if(h[1+D]==0&&h[2+D]==0&&h[3+D]==0&&h[4+D]==0&&h[5+D]==0&&h[6+D]==0&&h[7+D]==0){A=f*h[0+D]+512>>10,h[0+D]=A,h[1+D]=A,h[2+D]=A,h[3+D]=A,h[4+D]=A,h[5+D]=A,h[6+D]=A,h[7+D]=A;continue}C=f*h[0+D]+128>>8,x=f*h[4+D]+128>>8,E=h[2+D],U=h[6+D],p=l*(h[1+D]-h[7+D])+128>>8,G=l*(h[1+D]+h[7+D])+128>>8,I=h[3+D]<<4,F=h[5+D]<<4,A=C-x+1>>1,C=C+x+1>>1,x=A,A=E*a+U*s+128>>8,E=E*s-U*a+128>>8,U=A,A=p-F+1>>1,p=p+F+1>>1,F=A,A=G+I+1>>1,I=G-I+1>>1,G=A,A=C-U+1>>1,C=C+U+1>>1,U=A,A=x-E+1>>1,x=x+E+1>>1,E=A,A=p*o+G*n+2048>>12,p=p*n-G*o+2048>>12,G=A,A=I*r+F*i+2048>>12,I=I*i-F*r+2048>>12,F=A,h[0+D]=C+G,h[7+D]=C-G,h[1+D]=x+F,h[6+D]=x-F,h[2+D]=E+I,h[5+D]=E-I,h[3+D]=U+p,h[4+D]=U-p}for(M=0;M<8;++M){var y=M;if(h[8+y]==0&&h[16+y]==0&&h[24+y]==0&&h[32+y]==0&&h[40+y]==0&&h[48+y]==0&&h[56+y]==0){A=f*h[M+0]+8192>>14,h[0+y]=A,h[8+y]=A,h[16+y]=A,h[24+y]=A,h[32+y]=A,h[40+y]=A,h[48+y]=A,h[56+y]=A;continue}C=f*h[0+y]+2048>>12,x=f*h[32+y]+2048>>12,E=h[16+y],U=h[48+y],p=l*(h[8+y]-h[56+y])+2048>>12,G=l*(h[8+y]+h[56+y])+2048>>12,I=h[24+y],F=h[40+y],A=C-x+1>>1,C=C+x+1>>1,x=A,A=E*a+U*s+2048>>12,E=E*s-U*a+2048>>12,U=A,A=p-F+1>>1,p=p+F+1>>1,F=A,A=G+I+1>>1,I=G-I+1>>1,G=A,A=C-U+1>>1,C=C+U+1>>1,U=A,A=x-E+1>>1,x=x+E+1>>1,E=A,A=p*o+G*n+2048>>12,p=p*n-G*o+2048>>12,G=A,A=I*r+F*i+2048>>12,I=I*i-F*r+2048>>12,F=A,h[0+y]=C+G,h[56+y]=C-G,h[8+y]=x+F,h[48+y]=x-F,h[16+y]=E+I,h[40+y]=E-I,h[24+y]=U+p,h[32+y]=U-p}for(M=0;M<64;++M){var Y=v+M,L=h[M];L=L<=-2056?0:L>=2024?255:L+2056>>4,c.blockData[Y]=L}}function b(c,v){for(var h=v.blocksPerLine,B=v.blocksPerColumn,C=new Int32Array(64),x=0;x<B;x++)for(var E=0;E<h;E++){var U=S(v,x,E);T(v,U,C)}return v.blockData}function w(c){return c<=0?0:c>=255?255:c|0}return u.prototype={load:function(v){var h=new XMLHttpRequest;h.open("GET",v,!0),h.responseType="arraybuffer",h.onload=(function(){var B=new Uint8Array(h.response||h.mozResponseArrayBuffer);this.parse(B),this.onload&&this.onload()}).bind(this),h.send(null)},loadFromBuffer:function(v){this.parse(v),this.onload&&this.onload()},parse:function(v){function h(){var N=v[x]<<8|v[x+1];return x+=2,N}function B(){var N=h(),$=v.subarray(x,x+N-2);return x+=$.length,$}function C(N){for(var $=Math.ceil(N.samplesPerLine/8/N.maxH),fe=Math.ceil(N.scanLines/8/N.maxV),ce=0;ce<N.components.length;ce++){K=N.components[ce];var ot=Math.ceil(Math.ceil(N.samplesPerLine/8)*K.h/N.maxH),Lt=Math.ceil(Math.ceil(N.scanLines/8)*K.v/N.maxV),Lr=$*K.h,Fr=fe*K.v,Mr=64*Fr*(Lr+1);K.blockData=new Int16Array(Mr),K.blocksPerLine=ot,K.blocksPerColumn=Lt}N.mcusPerLine=$,N.mcusPerColumn=fe}var x=0;v.length;var E=null,U=null,p,I,F=[],G=[],A=[],M=h();if(M!=65496)throw"SOI not found";for(M=h();M!=65497;){var D,y,Y;switch(M){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var L=B();M===65504&&L[0]===74&&L[1]===70&&L[2]===73&&L[3]===70&&L[4]===0&&(E={version:{major:L[5],minor:L[6]},densityUnits:L[7],xDensity:L[8]<<8|L[9],yDensity:L[10]<<8|L[11],thumbWidth:L[12],thumbHeight:L[13],thumbData:L.subarray(14,14+3*L[12]*L[13])}),M===65518&&L[0]===65&&L[1]===100&&L[2]===111&&L[3]===98&&L[4]===101&&L[5]===0&&(U={version:L[6],flags0:L[7]<<8|L[8],flags1:L[9]<<8|L[10],transformCode:L[11]});break;case 65499:for(var re=h(),be=re+x-2;x<be;){var me=v[x++],oe=new Int32Array(64);if(me>>4===0)for(y=0;y<64;y++){var Te=e[y];oe[Te]=v[x++]}else if(me>>4===1)for(y=0;y<64;y++){var Te=e[y];oe[Te]=h()}else throw"DQT: invalid table spec";F[me&15]=oe}break;case 65472:case 65473:case 65474:if(p)throw"Only single frame JPEGs supported";h(),p={},p.extended=M===65473,p.progressive=M===65474,p.precision=v[x++],p.scanLines=h(),p.samplesPerLine=h(),p.components=[],p.componentIds={};var ie=v[x++],pe,Ue=0,ye=0;for(D=0;D<ie;D++){pe=v[x];var Ce=v[x+1]>>4,se=v[x+1]&15;Ue<Ce&&(Ue=Ce),ye<se&&(ye=se);var le=v[x+2],Y=p.components.push({h:Ce,v:se,quantizationTable:F[le]});p.componentIds[pe]=Y-1,x+=3}p.maxH=Ue,p.maxV=ye,C(p);break;case 65476:var j=h();for(D=2;D<j;){var Z=v[x++],Me=new Uint8Array(16),Ae=0;for(y=0;y<16;y++,x++)Ae+=Me[y]=v[x];var _e=new Uint8Array(Ae);for(y=0;y<Ae;y++,x++)_e[y]=v[x];D+=17+Ae,(Z>>4===0?A:G)[Z&15]=g(Me,_e)}break;case 65501:h(),I=h();break;case 65498:h();var ze=v[x++],We=[],K;for(D=0;D<ze;D++){var gt=p.componentIds[v[x++]];K=p.components[gt];var nt=v[x++];K.huffmanTableDC=A[nt>>4],K.huffmanTableAC=G[nt&15],We.push(K)}var V=v[x++],O=v[x++],X=v[x++],ve=m(v,x,p,We,I,V,O,X>>4,X&15);x+=ve;break;default:if(v[x-3]==255&&v[x-2]>=192&&v[x-2]<=254){x-=3;break}throw"unknown JPEG marker "+M.toString(16)}M=h()}this.width=p.samplesPerLine,this.height=p.scanLines,this.jfif=E,this.adobe=U,this.components=[];for(var D=0;D<p.components.length;D++){var K=p.components[D];this.components.push({output:b(p,K),scaleX:K.h/p.maxH,scaleY:K.v/p.maxV,blocksPerLine:K.blocksPerLine,blocksPerColumn:K.blocksPerColumn})}},getData:function(v,h,B){var C=this.width/h,x=this.height/B,E,U,p,I,F,G,A=0,M=this.components.length,D=v.data,y=new Uint8Array((this.components[0].blocksPerLine<<3)*this.components[0].blocksPerColumn*8);for(G=0;G<M;G++){E=this.components[G<3?2-G:G];for(var Y=E.blocksPerLine,L=E.blocksPerColumn,re=Y<<3,be,me,oe=0,Te=0;Te<L;Te++)for(var ie=Te<<3,pe=0;pe<Y;pe++){var Ue=S(E,Te,pe),A=0,ye=pe<<3;for(be=0;be<8;be++){var oe=(ie+be)*re;for(me=0;me<8;me++)y[oe+ye+me]=E.output[Ue+A++]}}U=E.scaleX*C,p=E.scaleY*x,A=G;var Ce,se,le;for(F=0;F<B;F++)for(I=0;I<h;I++)se=0|F*p,Ce=0|I*U,le=se*re+Ce,D[A]=y[le],A+=M}return D},copyToImageData:function(v){var h=v.width,B=v.height,C=h*B*4,x=v.data,E=this.getData(h,B),U=0,p=0,I,F,G,A,M,D,y,Y,L;switch(this.components.length){case 1:for(;p<C;)G=E[U++],x[p++]=G,x[p++]=G,x[p++]=G,x[p++]=255;break;case 3:for(;p<C;)y=E[U++],Y=E[U++],L=E[U++],x[p++]=y,x[p++]=Y,x[p++]=L,x[p++]=255;break;case 4:for(;p<C;)M=E[U++],D=E[U++],G=E[U++],A=E[U++],I=255-A,F=I/255,y=w(I-M*F),Y=w(I-D*F),L=w(I-G*F),x[p++]=y,x[p++]=Y,x[p++]=L,x[p++]=255;break;default:throw"Unsupported color mode"}}},u})();function ji(t){const e=new $i;e.loadFromBuffer(t);var i;return typeof ImageData<"u"?i=new ImageData(e.width,e.height):i={width:e.width,height:e.height,data:new Uint8ClampedArray(e.width*e.height*4)},e.getData(i,e.width,e.height),i}function Zi(t,e){return String.fromCharCode(t.getUint8(e),t.getUint8(e+1),t.getUint8(e+2),t.getUint8(e+3))}function je(t,e){return t.getUint32(e*4,!0)}function Qi(t,e,i){const r=t[Math.floor(i*e/8)],n=8/e;return r>>n-i%n-1&(1<<e)-1}function Ji(t,e){return typeof ImageData<"u"?new ImageData(t,e):{width:t,height:e,data:new Uint8ClampedArray(t*e*4),colorSpace:"srgb"}}function en(t){const e=new DataView(t),i={type:Cr.BLP1,width:0,height:0,content:ut.JPEG,alphaBits:0,mipmaps:[],data:t},r=Zi(e,0);if(r==="BLP0"||r==="BLP2")throw new Error("BLP0/BLP2 not supported");if(r!=="BLP1")throw new Error("Not a blp image");if(i.content=je(e,1),i.content!==ut.JPEG&&i.content!==ut.Direct)throw new Error("Unknown BLP content");i.alphaBits=je(e,2),i.width=je(e,3),i.height=je(e,4);for(let n=0;n<16;++n){const o={offset:je(e,7+n),size:je(e,23+n)};if(o.size>0)i.mipmaps.push(o);else break}return i}function tn(t,e){const i=new DataView(t.data),r=new Uint8Array(t.data),n=t.mipmaps[e];if(t.content===ut.JPEG){const o=je(i,39),s=new Uint8Array(o+n.size);return s.set(r.subarray(160,160+o)),s.set(r.subarray(n.offset,n.offset+n.size),o),ji(s)}else{const o=new Uint8Array(t.data,156,1024),s=t.width/(1<<e),a=t.height/(1<<e),f=s*a,l=new Uint8Array(t.data,n.offset+f,Math.ceil(f*t.alphaBits/8)),u=Ji(s,a),g=255/((1<<t.alphaBits)-1);for(let S=0;S<f;++S){const m=i.getUint8(n.offset+S)*4;u.data[S*4]=o[m+2],u.data[S*4+1]=o[m+1],u.data[S*4+2]=o[m],t.alphaBits>0?u.data[S*4+3]=Qi(l,t.alphaBits,S)*g:u.data[S*4+3]=255}return u}}const Se={frame:0,left:null,right:null};function Ht(t,e,i){return t*(1-i)+e*i}function rn(t,e,i,r,n){const o=1-n,s=o*o,a=n*n,f=s*o,l=3*n*s,u=3*a*o,g=a*n;return t*f+e*l+i*u+r*g}function nn(t,e,i,r,n){const o=n*n,s=o*(2*n-3)+1,a=o*(n-2)+n,f=o*(n-1),l=o*(3-2*n);return t*s+e*a+i*f+r*l}function on(t,e,i,r){if(!t)return null;const n=t.Keys;let o=0,s=n.length;if(s===0||n[0].Frame>r)return null;if(n[s-1].Frame<i)return null;for(;s>0;){const a=s>>1;n[o+a].Frame<=e?(o=o+a+1,s-=a+1):s=a}return o===n.length||n[o].Frame>r?o>0&&n[o-1].Frame>=i?(Se.frame=e,Se.left=n[o-1],Se.right=n[o-1],Se):null:o===0||n[o-1].Frame<i?n[o].Frame<=r?(Se.frame=e,Se.left=n[o],Se.right=n[o],Se):null:(Se.frame=e,Se.left=n[o-1],Se.right=n[o],Se)}function sn(t,e,i,r){if(e.Frame===i.Frame)return e.Vector[0];const n=(t-e.Frame)/(i.Frame-e.Frame);return r===ae.DontInterp?e.Vector[0]:r===ae.Bezier?rn(e.Vector[0],e.OutTan[0],i.InTan[0],i.Vector[0],n):r===ae.Hermite?nn(e.Vector[0],e.OutTan[0],i.InTan[0],i.Vector[0],n):Ht(e.Vector[0],i.Vector[0],n)}function an(t,e,i,r,n){if(i.Frame===r.Frame)return i.Vector;const o=(e-i.Frame)/(r.Frame-i.Frame);return n===ae.DontInterp?i.Vector:n===ae.Bezier?d.bezier(t,i.Vector,i.OutTan,r.InTan,r.Vector,o):n===ae.Hermite?d.hermite(t,i.Vector,i.OutTan,r.InTan,r.Vector,o):d.lerp(t,i.Vector,r.Vector,o)}function ln(t,e,i,r,n){if(i.Frame===r.Frame)return i.Vector;const o=(e-i.Frame)/(r.Frame-i.Frame);return n===ae.DontInterp?i.Vector:n===ae.Hermite||n===ae.Bezier?ue.sqlerp(t,i.Vector,i.OutTan,r.InTan,r.Vector,o):ue.slerp(t,i.Vector,r.Vector,o)}const qe={frame:0,from:0,to:0};class qt{static maxAnimVectorVal(e){if(typeof e=="number")return e;let i=e.Keys[0].Vector[0];for(let r=1;r<e.Keys.length;++r)e.Keys[r].Vector[0]>i&&(i=e.Keys[r].Vector[0]);return i}constructor(e){this.rendererData=e}num(e){const i=this.findKeyframes(e);return i?sn(i.frame,i.left,i.right,e.LineType):null}vec3(e,i){const r=this.findKeyframes(i);return r?an(e,r.frame,r.left,r.right,i.LineType):null}quat(e,i){const r=this.findKeyframes(i);return r?ln(e,r.frame,r.left,r.right,i.LineType):null}animVectorVal(e,i){let r;return typeof e=="number"?r=e:(r=this.num(e),r===null&&(r=i)),r}findKeyframes(e){if(!e)return null;const{frame:i,from:r,to:n}=this.findLocalFrame(e);return on(e,i,r,n)}findLocalFrame(e){return typeof e.GlobalSeqId=="number"?(qe.frame=this.rendererData.globalSequencesFrames[e.GlobalSeqId],qe.from=0,qe.to=this.rendererData.model.GlobalSequences[e.GlobalSeqId]):(qe.frame=this.rendererData.frame,qe.from=this.rendererData.animationInfo.Interval[0],qe.to=this.rendererData.animationInfo.Interval[1]),qe}}const fn=`attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
varying vec4 vColor;

void main(void) {
    vec4 position = vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * uMVMatrix * position;
    vTextureCoord = aTextureCoord;
    vColor = aColor;
}
`,hn=`precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;
uniform vec3 uReplaceableColor;
uniform float uReplaceableType;
uniform float uDiscardAlphaLevel;

float hypot (vec2 z) {
    float t;
    float x = abs(z.x);
    float y = abs(z.y);
    t = min(x, y);
    x = max(x, y);
    t = t / x;
    return (z.x == 0.0 && z.y == 0.0) ? 0.0 : x * sqrt(1.0 + t * t);
}

void main(void) {
    vec2 coords = vec2(vTextureCoord.s, vTextureCoord.t);
    if (uReplaceableType == 0.) {
        gl_FragColor = texture2D(uSampler, coords);
    } else if (uReplaceableType == 1.) {
        gl_FragColor = vec4(uReplaceableColor, 1.0);
    } else if (uReplaceableType == 2.) {
        float dist = hypot(coords - vec2(0.5, 0.5)) * 2.;
        float truncateDist = clamp(1. - dist * 1.4, 0., 1.);
        float alpha = sin(truncateDist);
        gl_FragColor = vec4(uReplaceableColor * alpha, 1.0);
    }
    gl_FragColor *= vColor;

    if (gl_FragColor[3] < uDiscardAlphaLevel) {
        discard;
    }
}
`,un=`struct VSUniforms {
    mvMatrix: mat4x4f,
    pMatrix: mat4x4f,
}

struct FSUniforms {
    replaceableColor: vec3f,
    replaceableType: u32,
    discardAlphaLevel: f32,
}

@group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;
@group(1) @binding(0) var<uniform> fsUniforms: FSUniforms;
@group(1) @binding(1) var fsUniformSampler: sampler;
@group(1) @binding(2) var fsUniformTexture: texture_2d<f32>;

struct VSIn {
    @location(0) vertexPosition: vec3f,
    @location(1) textureCoord: vec2f,
    @location(2) color: vec4f,
}

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) textureCoord: vec2f,
    @location(1) color: vec4f,
}

@vertex fn vs(
    in: VSIn
) -> VSOut {
    var position: vec4f = vec4f(in.vertexPosition, 1.0);

    var out: VSOut;
    out.position = vsUniforms.pMatrix * vsUniforms.mvMatrix * position;
    out.textureCoord = in.textureCoord;
    out.color = in.color;
    return out;
}

fn hypot(z: vec2f) -> f32 {
    var t: f32 = 0;
    var x: f32 = abs(z.x);
    let y: f32 = abs(z.y);
    t = min(x, y);
    x = max(x, y);
    t = t / x;
    if (z.x == 0.0 && z.y == 0.0) {
        return 0.0;
    }
    return x * sqrt(1.0 + t * t);
}

@fragment fn fs(
    in: VSOut
) -> @location(0) vec4f {
    let texCoord: vec2f = in.textureCoord;
    var color: vec4f = vec4f(0.0);

    if (fsUniforms.replaceableType == 0) {
        color = textureSample(fsUniformTexture, fsUniformSampler, texCoord);
    } else if (fsUniforms.replaceableType == 1) {
        color = vec4f(fsUniforms.replaceableColor, 1.0);
    } else if (fsUniforms.replaceableType == 2) {
        let dist: f32 = hypot(texCoord - vec2(0.5, 0.5)) * 2.;
        let truncateDist: f32 = clamp(1. - dist * 1.4, 0., 1.);
        let alpha: f32 = sin(truncateDist);
        color = vec4f(fsUniforms.replaceableColor * alpha, 1.0);
    }

    color *= in.color;

    // hand-made alpha-test
    if (color.a < fsUniforms.discardAlphaLevel) {
        discard;
    }

    return color;
}
`,or=d.fromValues(0,0,0),Ve=Bt.create(),Re=Bt.create(),at=Bt.create(),we=d.create(),ne=d.create(),sr=.83,ar=.01;class cn{constructor(e,i){if(this.shaderProgramLocations={vertexPositionAttribute:null,textureCoordAttribute:null,colorAttribute:null,pMatrixUniform:null,mvMatrixUniform:null,samplerUniform:null,replaceableColorUniform:null,replaceableTypeUniform:null,discardAlphaLevelUniform:null},this.particleStorage=[],this.interp=e,this.rendererData=i,this.emitters=[],i.model.ParticleEmitters2.length){this.particleBaseVectors=[d.create(),d.create(),d.create(),d.create()];for(let r=0;r<i.model.ParticleEmitters2.length;++r){const n=i.model.ParticleEmitters2[r],o={index:r,emission:0,squirtFrame:0,particles:[],props:n,capacity:0,baseCapacity:0,type:n.FrameFlags,tailVertices:null,tailVertexBuffer:null,tailVertexGPUBuffer:null,headVertices:null,headVertexBuffer:null,headVertexGPUBuffer:null,tailTexCoords:null,tailTexCoordBuffer:null,tailTexCoordGPUBuffer:null,headTexCoords:null,headTexCoordBuffer:null,headTexCoordGPUBuffer:null,colors:null,colorBuffer:null,colorGPUBuffer:null,indices:null,indexBuffer:null,indexGPUBuffer:null,fsUniformsBuffer:null};o.baseCapacity=Math.ceil(qt.maxAnimVectorVal(o.props.EmissionRate)*o.props.LifeSpan),this.emitters.push(o)}}}destroy(){this.shaderProgram&&(this.vertexShader&&(this.gl.detachShader(this.shaderProgram,this.vertexShader),this.gl.deleteShader(this.vertexShader),this.vertexShader=null),this.fragmentShader&&(this.gl.detachShader(this.shaderProgram,this.fragmentShader),this.gl.deleteShader(this.fragmentShader),this.fragmentShader=null),this.gl.deleteProgram(this.shaderProgram),this.shaderProgram=null),this.particleStorage=[],this.gpuVSUniformsBuffer&&(this.gpuVSUniformsBuffer.destroy(),this.gpuVSUniformsBuffer=null);for(const e of this.emitters)e.colorGPUBuffer&&e.colorGPUBuffer.destroy(),e.indexGPUBuffer&&e.indexGPUBuffer.destroy(),e.headVertexGPUBuffer&&e.headVertexGPUBuffer.destroy(),e.tailVertexGPUBuffer&&e.tailVertexGPUBuffer.destroy(),e.headTexCoordGPUBuffer&&e.headTexCoordGPUBuffer.destroy(),e.tailTexCoordGPUBuffer&&e.tailTexCoordGPUBuffer.destroy(),e.fsUniformsBuffer&&e.fsUniformsBuffer.destroy();this.emitters=[]}initGL(e){this.gl=e,this.initShaders()}initGPUDevice(e){this.device=e,this.gpuShaderModule=e.createShaderModule({label:"particles shader module",code:un}),this.vsBindGroupLayout=this.device.createBindGroupLayout({label:"particles vs bind group layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform",hasDynamicOffset:!1,minBindingSize:128}}]}),this.fsBindGroupLayout=this.device.createBindGroupLayout({label:"particles bind group layout2",entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!1,minBindingSize:32}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}}]}),this.gpuPipelineLayout=this.device.createPipelineLayout({label:"particles pipeline layout",bindGroupLayouts:[this.vsBindGroupLayout,this.fsBindGroupLayout]});const i=(r,n,o)=>e.createRenderPipeline({label:`particles pipeline ${r}`,layout:this.gpuPipelineLayout,vertex:{module:this.gpuShaderModule,buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]},{arrayStride:8,attributes:[{shaderLocation:1,offset:0,format:"float32x2"}]},{arrayStride:16,attributes:[{shaderLocation:2,offset:0,format:"float32x4"}]}]},fragment:{module:this.gpuShaderModule,targets:[{format:navigator.gpu.getPreferredCanvasFormat(),blend:n}]},depthStencil:o});this.gpuPipelines=[i("blend",{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one-minus-src-alpha"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}),i("additive",{color:{operation:"add",srcFactor:"src",dstFactor:"one"},alpha:{operation:"add",srcFactor:"src",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}),i("modulate",{color:{operation:"add",srcFactor:"zero",dstFactor:"src"},alpha:{operation:"add",srcFactor:"zero",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}),i("modulate2x",{color:{operation:"add",srcFactor:"dst",dstFactor:"src"},alpha:{operation:"add",srcFactor:"zero",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}),i("alphaKey",{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one"},alpha:{operation:"add",srcFactor:"src-alpha",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"})],this.gpuVSUniformsBuffer=this.device.createBuffer({label:"particles vs uniforms",size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.gpuVSUniformsBindGroup=this.device.createBindGroup({layout:this.vsBindGroupLayout,entries:[{binding:0,resource:{buffer:this.gpuVSUniformsBuffer}}]})}initShaders(){const e=this.vertexShader=Le(this.gl,fn,this.gl.VERTEX_SHADER),i=this.fragmentShader=Le(this.gl,hn,this.gl.FRAGMENT_SHADER),r=this.shaderProgram=this.gl.createProgram();this.gl.attachShader(r,e),this.gl.attachShader(r,i),this.gl.linkProgram(r),this.gl.getProgramParameter(r,this.gl.LINK_STATUS)||alert("Could not initialise shaders"),this.gl.useProgram(r),this.shaderProgramLocations.vertexPositionAttribute=this.gl.getAttribLocation(r,"aVertexPosition"),this.shaderProgramLocations.textureCoordAttribute=this.gl.getAttribLocation(r,"aTextureCoord"),this.shaderProgramLocations.colorAttribute=this.gl.getAttribLocation(r,"aColor"),this.shaderProgramLocations.pMatrixUniform=this.gl.getUniformLocation(r,"uPMatrix"),this.shaderProgramLocations.mvMatrixUniform=this.gl.getUniformLocation(r,"uMVMatrix"),this.shaderProgramLocations.samplerUniform=this.gl.getUniformLocation(r,"uSampler"),this.shaderProgramLocations.replaceableColorUniform=this.gl.getUniformLocation(r,"uReplaceableColor"),this.shaderProgramLocations.replaceableTypeUniform=this.gl.getUniformLocation(r,"uReplaceableType"),this.shaderProgramLocations.discardAlphaLevelUniform=this.gl.getUniformLocation(r,"uDiscardAlphaLevel")}updateParticle(e,i){i/=1e3,e.lifeSpan-=i,!(e.lifeSpan<=0)&&(e.speed[2]-=e.gravity*i,e.pos[0]+=e.speed[0]*i,e.pos[1]+=e.speed[1]*i,e.pos[2]+=e.speed[2]*i)}resizeEmitterBuffers(e,i){var l,u,g,S,m,T;if(i<=e.capacity)return;i=Math.max(i,e.baseCapacity);let r,n,o,s;e.type&k.Tail&&(r=new Float32Array(i*4*3),o=new Float32Array(i*4*2)),e.type&k.Head&&(n=new Float32Array(i*4*3),s=new Float32Array(i*4*2));const a=new Float32Array(i*4*4),f=new Uint16Array(i*6);e.capacity&&f.set(e.indices);for(let b=e.capacity;b<i;++b)f[b*6]=b*4,f[b*6+1]=b*4+1,f[b*6+2]=b*4+2,f[b*6+3]=b*4+2,f[b*6+4]=b*4+1,f[b*6+5]=b*4+3;r&&(e.tailVertices=r,e.tailTexCoords=o),n&&(e.headVertices=n,e.headTexCoords=s),e.colors=a,e.indices=f,e.capacity=i,e.indexBuffer||(this.gl?(e.type&k.Tail&&(e.tailVertexBuffer=this.gl.createBuffer(),e.tailTexCoordBuffer=this.gl.createBuffer()),e.type&k.Head&&(e.headVertexBuffer=this.gl.createBuffer(),e.headTexCoordBuffer=this.gl.createBuffer()),e.colorBuffer=this.gl.createBuffer(),e.indexBuffer=this.gl.createBuffer()):this.device&&(e.type&k.Tail&&((l=e.tailVertexGPUBuffer)==null||l.destroy(),e.tailVertexGPUBuffer=this.device.createBuffer({label:`particles tail vertex buffer ${e.index}`,size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),(u=e.tailTexCoordGPUBuffer)==null||u.destroy(),e.tailTexCoordGPUBuffer=this.device.createBuffer({label:`particles tail texCoords buffer ${e.index}`,size:o.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST})),e.type&k.Head&&((g=e.headVertexGPUBuffer)==null||g.destroy(),e.headVertexGPUBuffer=this.device.createBuffer({label:`particles head vertex buffer ${e.index}`,size:n.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),(S=e.headTexCoordGPUBuffer)==null||S.destroy(),e.headTexCoordGPUBuffer=this.device.createBuffer({label:`particles head texCoords buffer ${e.index}`,size:s.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST})),(m=e.colorGPUBuffer)==null||m.destroy(),e.colorGPUBuffer=this.device.createBuffer({label:`particles color buffer ${e.index}`,size:a.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),(T=e.indexGPUBuffer)==null||T.destroy(),e.indexGPUBuffer=this.device.createBuffer({label:`particles index buffer ${e.index}`,size:f.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST})))}update(e){for(const i of this.emitters)this.updateEmitter(i,e)}render(e,i){this.gl.enable(this.gl.CULL_FACE),this.gl.useProgram(this.shaderProgram),this.gl.uniformMatrix4fv(this.shaderProgramLocations.pMatrixUniform,!1,i),this.gl.uniformMatrix4fv(this.shaderProgramLocations.mvMatrixUniform,!1,e),this.gl.enableVertexAttribArray(this.shaderProgramLocations.vertexPositionAttribute),this.gl.enableVertexAttribArray(this.shaderProgramLocations.textureCoordAttribute),this.gl.enableVertexAttribArray(this.shaderProgramLocations.colorAttribute);for(const r of this.emitters)r.particles.length&&(this.setLayerProps(r),this.setGeneralBuffers(r),r.type&k.Tail&&this.renderEmitterType(r,k.Tail),r.type&k.Head&&this.renderEmitterType(r,k.Head));this.gl.disableVertexAttribArray(this.shaderProgramLocations.vertexPositionAttribute),this.gl.disableVertexAttribArray(this.shaderProgramLocations.textureCoordAttribute),this.gl.disableVertexAttribArray(this.shaderProgramLocations.colorAttribute)}renderGPUEmitterType(e,i,r){r===k.Tail?(this.device.queue.writeBuffer(i.tailTexCoordGPUBuffer,0,i.tailTexCoords),e.setVertexBuffer(1,i.tailTexCoordGPUBuffer)):(this.device.queue.writeBuffer(i.headTexCoordGPUBuffer,0,i.headTexCoords),e.setVertexBuffer(1,i.headTexCoordGPUBuffer)),r===k.Tail?(this.device.queue.writeBuffer(i.tailVertexGPUBuffer,0,i.tailVertices),e.setVertexBuffer(0,i.tailVertexGPUBuffer)):(this.device.queue.writeBuffer(i.headVertexGPUBuffer,0,i.headVertices),e.setVertexBuffer(0,i.headVertexGPUBuffer)),e.drawIndexed(i.particles.length*6)}renderGPU(e,i,r){const n=new ArrayBuffer(128),o={mvMatrix:new Float32Array(n,0,16),pMatrix:new Float32Array(n,64,16)};o.mvMatrix.set(i),o.pMatrix.set(r),this.device.queue.writeBuffer(this.gpuVSUniformsBuffer,0,n),e.setBindGroup(0,this.gpuVSUniformsBindGroup);for(const s of this.emitters){if(!s.particles.length)continue;const a=this.gpuPipelines[s.props.FilterMode]||this.gpuPipelines[0];e.setPipeline(a);const f=s.props.TextureID,l=this.rendererData.model.Textures[f],u=new ArrayBuffer(32),g={replaceableColor:new Float32Array(u,0,3),replaceableType:new Uint32Array(u,12,1),discardAlphaLevel:new Float32Array(u,16,1)};g.replaceableColor.set(this.rendererData.teamColor),g.replaceableType.set([l.ReplaceableId||0]),s.props.FilterMode===xe.AlphaKey?g.discardAlphaLevel.set([sr]):s.props.FilterMode===xe.Modulate||s.props.FilterMode===xe.Modulate2x?g.discardAlphaLevel.set([ar]):g.discardAlphaLevel.set([0]),s.fsUniformsBuffer||(s.fsUniformsBuffer=this.device.createBuffer({label:`particles fs uniforms ${s.index}`,size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})),this.device.queue.writeBuffer(s.fsUniformsBuffer,0,u);const S=this.device.createBindGroup({label:`particles fs uniforms ${s.index}`,layout:this.fsBindGroupLayout,entries:[{binding:0,resource:{buffer:s.fsUniformsBuffer}},{binding:1,resource:this.rendererData.gpuSamplers[f]},{binding:2,resource:(this.rendererData.gpuTextures[l.Image]||this.rendererData.gpuEmptyTexture).createView()}]});e.setBindGroup(1,S),this.device.queue.writeBuffer(s.colorGPUBuffer,0,s.colors),this.device.queue.writeBuffer(s.indexGPUBuffer,0,s.indices),e.setVertexBuffer(2,s.colorGPUBuffer),e.setIndexBuffer(s.indexGPUBuffer,"uint16"),s.type&k.Tail&&this.renderGPUEmitterType(e,s,k.Tail),s.type&k.Head&&this.renderGPUEmitterType(e,s,k.Head)}}updateEmitter(e,i){if(this.interp.animVectorVal(e.props.Visibility,1)>0){if(e.props.Squirt&&typeof e.props.EmissionRate!="number"){const n=this.interp.findKeyframes(e.props.EmissionRate);n&&n.left&&n.left.Frame!==e.squirtFrame&&(e.squirtFrame=n.left.Frame,n.left.Vector[0]>0&&(e.emission+=n.left.Vector[0]*1e3))}else{const n=this.interp.animVectorVal(e.props.EmissionRate,0);e.emission+=n*i}for(;e.emission>=1e3;)e.emission-=1e3,e.particles.push(this.createParticle(e,this.rendererData.nodes[e.props.ObjectId].matrix))}if(e.particles.length){const n=[];for(const o of e.particles)this.updateParticle(o,i),o.lifeSpan>0?n.push(o):this.particleStorage.push(o);if(e.particles=n,e.type&k.Head)if(e.props.Flags&ht.XYQuad)d.set(this.particleBaseVectors[0],-1,1,0),d.set(this.particleBaseVectors[1],-1,-1,0),d.set(this.particleBaseVectors[2],1,1,0),d.set(this.particleBaseVectors[3],1,-1,0);else{d.set(this.particleBaseVectors[0],0,-1,1),d.set(this.particleBaseVectors[1],0,-1,-1),d.set(this.particleBaseVectors[2],0,1,1),d.set(this.particleBaseVectors[3],0,1,-1);for(let o=0;o<4;++o)d.transformQuat(this.particleBaseVectors[o],this.particleBaseVectors[o],this.rendererData.cameraQuat)}this.resizeEmitterBuffers(e,e.particles.length);for(let o=0;o<e.particles.length;++o)this.updateParticleBuffers(e.particles[o],o,e)}}createParticle(e,i){let r;this.particleStorage.length?r=this.particleStorage.pop():r={emitter:null,pos:d.create(),angle:0,speed:d.create(),gravity:null,lifeSpan:null};const n=this.interp.animVectorVal(e.props.Width,0),o=this.interp.animVectorVal(e.props.Length,0);let s=this.interp.animVectorVal(e.props.Speed,0);const a=this.interp.animVectorVal(e.props.Variation,0),f=Vr(this.interp.animVectorVal(e.props.Latitude,0));return r.emitter=e,r.pos[0]=e.props.PivotPoint[0]+st(-n,n),r.pos[1]=e.props.PivotPoint[1]+st(-o,o),r.pos[2]=e.props.PivotPoint[2],d.transformMat4(r.pos,r.pos,i),a>0&&(s*=1+st(-a,a)),d.set(r.speed,0,0,s),r.angle=st(0,Math.PI*2),d.rotateY(r.speed,r.speed,or,st(0,f)),d.rotateZ(r.speed,r.speed,or,r.angle),e.props.Flags&ht.LineEmitter&&(r.speed[0]=0),d.transformMat4(r.speed,r.speed,i),r.speed[0]-=i[12],r.speed[1]-=i[13],r.speed[2]-=i[14],r.gravity=this.interp.animVectorVal(e.props.Gravity,0),r.lifeSpan=e.props.LifeSpan,r}updateParticleBuffers(e,i,r){const n=1-e.lifeSpan/r.props.LifeSpan,o=n<r.props.Time;let s;o?s=n/r.props.Time:s=(n-r.props.Time)/(1-r.props.Time),this.updateParticleVertices(e,i,r,o,s),this.updateParticleTexCoords(i,r,o,s),this.updateParticleColor(i,r,o,s)}updateParticleVertices(e,i,r,n,o){let s,a,f;if(n?(s=r.props.ParticleScaling[0],a=r.props.ParticleScaling[1]):(s=r.props.ParticleScaling[1],a=r.props.ParticleScaling[2]),f=Ht(s,a,o),r.type&k.Head){for(let l=0;l<4;++l)if(r.headVertices[i*12+l*3]=this.particleBaseVectors[l][0]*f,r.headVertices[i*12+l*3+1]=this.particleBaseVectors[l][1]*f,r.headVertices[i*12+l*3+2]=this.particleBaseVectors[l][2]*f,r.props.Flags&ht.XYQuad){const u=r.headVertices[i*12+l*3],g=r.headVertices[i*12+l*3+1];r.headVertices[i*12+l*3]=u*Math.cos(e.angle)-g*Math.sin(e.angle),r.headVertices[i*12+l*3+1]=u*Math.sin(e.angle)+g*Math.cos(e.angle)}}r.type&k.Tail&&(we[0]=-e.speed[0]*r.props.TailLength,we[1]=-e.speed[1]*r.props.TailLength,we[2]=-e.speed[2]*r.props.TailLength,d.cross(ne,e.speed,this.rendererData.cameraPos),d.normalize(ne,ne),d.scale(ne,ne,f),r.tailVertices[i*12]=ne[0],r.tailVertices[i*12+1]=ne[1],r.tailVertices[i*12+2]=ne[2],r.tailVertices[i*12+3]=-ne[0],r.tailVertices[i*12+3+1]=-ne[1],r.tailVertices[i*12+3+2]=-ne[2],r.tailVertices[i*12+6]=ne[0]+we[0],r.tailVertices[i*12+6+1]=ne[1]+we[1],r.tailVertices[i*12+6+2]=ne[2]+we[2],r.tailVertices[i*12+9]=-ne[0]+we[0],r.tailVertices[i*12+9+1]=-ne[1]+we[1],r.tailVertices[i*12+9+2]=-ne[2]+we[2]);for(let l=0;l<4;++l)r.headVertices&&(r.headVertices[i*12+l*3]+=e.pos[0],r.headVertices[i*12+l*3+1]+=e.pos[1],r.headVertices[i*12+l*3+2]+=e.pos[2]),r.tailVertices&&(r.tailVertices[i*12+l*3]+=e.pos[0],r.tailVertices[i*12+l*3+1]+=e.pos[1],r.tailVertices[i*12+l*3+2]+=e.pos[2])}updateParticleTexCoords(e,i,r,n){i.type&k.Head&&this.updateParticleTexCoordsByType(e,i,r,n,k.Head),i.type&k.Tail&&this.updateParticleTexCoordsByType(e,i,r,n,k.Tail)}updateParticleTexCoordsByType(e,i,r,n,o){let s,a;o===k.Tail?(s=r?i.props.TailUVAnim:i.props.TailDecayUVAnim,a=i.tailTexCoords):(s=r?i.props.LifeSpanUVAnim:i.props.DecayUVAnim,a=i.headTexCoords);const f=s[0],l=s[1],u=Math.round(Ht(f,l,n)),g=u%i.props.Columns,S=Math.floor(u/i.props.Rows),m=1/i.props.Columns,T=1/i.props.Rows;a[e*8]=g*m,a[e*8+1]=S*T,a[e*8+2]=g*m,a[e*8+3]=(1+S)*T,a[e*8+4]=(1+g)*m,a[e*8+5]=S*T,a[e*8+6]=(1+g)*m,a[e*8+7]=(1+S)*T}updateParticleColor(e,i,r,n){r?(Ve[0]=i.props.SegmentColor[0][0],Ve[1]=i.props.SegmentColor[0][1],Ve[2]=i.props.SegmentColor[0][2],Ve[3]=i.props.Alpha[0]/255,Re[0]=i.props.SegmentColor[1][0],Re[1]=i.props.SegmentColor[1][1],Re[2]=i.props.SegmentColor[1][2],Re[3]=i.props.Alpha[1]/255):(Ve[0]=i.props.SegmentColor[1][0],Ve[1]=i.props.SegmentColor[1][1],Ve[2]=i.props.SegmentColor[1][2],Ve[3]=i.props.Alpha[1]/255,Re[0]=i.props.SegmentColor[2][0],Re[1]=i.props.SegmentColor[2][1],Re[2]=i.props.SegmentColor[2][2],Re[3]=i.props.Alpha[2]/255),Bt.lerp(at,Ve,Re,n);for(let o=0;o<4;++o)i.colors[e*16+o*4]=at[0],i.colors[e*16+o*4+1]=at[1],i.colors[e*16+o*4+2]=at[2],i.colors[e*16+o*4+3]=at[3]}setLayerProps(e){e.props.FilterMode===xe.AlphaKey?this.gl.uniform1f(this.shaderProgramLocations.discardAlphaLevelUniform,sr):e.props.FilterMode===xe.Modulate||e.props.FilterMode===xe.Modulate2x?this.gl.uniform1f(this.shaderProgramLocations.discardAlphaLevelUniform,ar):this.gl.uniform1f(this.shaderProgramLocations.discardAlphaLevelUniform,0),e.props.FilterMode===xe.Blend?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.depthMask(!1)):e.props.FilterMode===xe.Additive?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE),this.gl.depthMask(!1)):e.props.FilterMode===xe.AlphaKey?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE),this.gl.depthMask(!1)):e.props.FilterMode===xe.Modulate?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.ZERO,this.gl.SRC_COLOR,this.gl.ZERO,this.gl.ONE),this.gl.depthMask(!1)):e.props.FilterMode===xe.Modulate2x&&(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.DST_COLOR,this.gl.SRC_COLOR,this.gl.ZERO,this.gl.ONE),this.gl.depthMask(!1));const i=this.rendererData.model.Textures[e.props.TextureID];i.Image?(this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.rendererData.textures[i.Image]),this.gl.uniform1i(this.shaderProgramLocations.samplerUniform,0),this.gl.uniform1f(this.shaderProgramLocations.replaceableTypeUniform,0)):(i.ReplaceableId===1||i.ReplaceableId===2)&&(this.gl.uniform3fv(this.shaderProgramLocations.replaceableColorUniform,this.rendererData.teamColor),this.gl.uniform1f(this.shaderProgramLocations.replaceableTypeUniform,i.ReplaceableId))}setGeneralBuffers(e){this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e.colorBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,e.colors,this.gl.DYNAMIC_DRAW),this.gl.vertexAttribPointer(this.shaderProgramLocations.colorAttribute,4,this.gl.FLOAT,!1,0,0),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,e.indexBuffer),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,e.indices,this.gl.DYNAMIC_DRAW)}renderEmitterType(e,i){i===k.Tail?(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e.tailTexCoordBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,e.tailTexCoords,this.gl.DYNAMIC_DRAW)):(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e.headTexCoordBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,e.headTexCoords,this.gl.DYNAMIC_DRAW)),this.gl.vertexAttribPointer(this.shaderProgramLocations.textureCoordAttribute,2,this.gl.FLOAT,!1,0,0),i===k.Tail?(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e.tailVertexBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,e.tailVertices,this.gl.DYNAMIC_DRAW)):(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e.headVertexBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,e.headVertices,this.gl.DYNAMIC_DRAW)),this.gl.vertexAttribPointer(this.shaderProgramLocations.vertexPositionAttribute,3,this.gl.FLOAT,!1,0,0),this.gl.drawElements(this.gl.TRIANGLES,e.particles.length*6,this.gl.UNSIGNED_SHORT,0)}}const dn=`attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;

void main(void) {
    vec4 position = vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * uMVMatrix * position;
    vTextureCoord = aTextureCoord;
}
`,gn=`precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec3 uReplaceableColor;
uniform float uReplaceableType;
uniform float uDiscardAlphaLevel;
uniform vec4 uColor;

float hypot (vec2 z) {
    float t;
    float x = abs(z.x);
    float y = abs(z.y);
    t = min(x, y);
    x = max(x, y);
    t = t / x;
    return (z.x == 0.0 && z.y == 0.0) ? 0.0 : x * sqrt(1.0 + t * t);
}

void main(void) {
    vec2 coords = vec2(vTextureCoord.s, vTextureCoord.t);
    if (uReplaceableType == 0.) {
        gl_FragColor = texture2D(uSampler, coords);
    } else if (uReplaceableType == 1.) {
        gl_FragColor = vec4(uReplaceableColor, 1.0);
    } else if (uReplaceableType == 2.) {
        float dist = hypot(coords - vec2(0.5, 0.5)) * 2.;
        float truncateDist = clamp(1. - dist * 1.4, 0., 1.);
        float alpha = sin(truncateDist);
        gl_FragColor = vec4(uReplaceableColor * alpha, 1.0);
    }
    gl_FragColor *= uColor;

    if (gl_FragColor[3] < uDiscardAlphaLevel) {
        discard;
    }
}
`,mn=`struct VSUniforms {
    mvMatrix: mat4x4f,
    pMatrix: mat4x4f,
}

struct FSUniforms {
    replaceableColor: vec3f,
    replaceableType: u32,
    discardAlphaLevel: f32,
    color: vec4f,
}

@group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;
@group(1) @binding(0) var<uniform> fsUniforms: FSUniforms;
@group(1) @binding(1) var fsUniformSampler: sampler;
@group(1) @binding(2) var fsUniformTexture: texture_2d<f32>;

struct VSIn {
    @location(0) vertexPosition: vec3f,
    @location(1) textureCoord: vec2f,
}

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) textureCoord: vec2f,
}

@vertex fn vs(
    in: VSIn
) -> VSOut {
    var position: vec4f = vec4f(in.vertexPosition, 1.0);

    var out: VSOut;
    out.position = vsUniforms.pMatrix * vsUniforms.mvMatrix * position;
    out.textureCoord = in.textureCoord;
    return out;
}

fn hypot(z: vec2f) -> f32 {
    var t: f32 = 0;
    var x: f32 = abs(z.x);
    let y: f32 = abs(z.y);
    t = min(x, y);
    x = max(x, y);
    t = t / x;
    if (z.x == 0.0 && z.y == 0.0) {
        return 0.0;
    }
    return x * sqrt(1.0 + t * t);
}

@fragment fn fs(
    in: VSOut
) -> @location(0) vec4f {
    let texCoord: vec2f = in.textureCoord;
    var color: vec4f = vec4f(0.0);

    if (fsUniforms.replaceableType == 0) {
        color = textureSample(fsUniformTexture, fsUniformSampler, texCoord);
    } else if (fsUniforms.replaceableType == 1) {
        color = vec4f(fsUniforms.replaceableColor, 1.0);
    } else if (fsUniforms.replaceableType == 2) {
        let dist: f32 = hypot(texCoord - vec2(0.5, 0.5)) * 2.;
        let truncateDist: f32 = clamp(1. - dist * 1.4, 0., 1.);
        let alpha: f32 = sin(truncateDist);
        color = vec4f(fsUniforms.replaceableColor * alpha, 1.0);
    }

    color *= fsUniforms.color;

    // hand-made alpha-test
    if (color.a < fsUniforms.discardAlphaLevel) {
        discard;
    }

    return color;
}
`;class pn{constructor(e,i){if(this.shaderProgramLocations={vertexPositionAttribute:null,textureCoordAttribute:null,pMatrixUniform:null,mvMatrixUniform:null,samplerUniform:null,replaceableColorUniform:null,replaceableTypeUniform:null,discardAlphaLevelUniform:null,colorUniform:null},this.interp=e,this.rendererData=i,this.emitters=[],i.model.RibbonEmitters.length)for(let r=0;r<i.model.RibbonEmitters.length;++r){const n=i.model.RibbonEmitters[r],o={index:r,emission:0,props:n,capacity:0,baseCapacity:0,creationTimes:[],vertices:null,vertexBuffer:null,vertexGPUBuffer:null,texCoords:null,texCoordBuffer:null,texCoordGPUBuffer:null,fsUnifrmsPerLayer:[]};o.baseCapacity=Math.ceil(qt.maxAnimVectorVal(o.props.EmissionRate)*o.props.LifeSpan)+1,this.emitters.push(o)}}destroy(){this.shaderProgram&&(this.vertexShader&&(this.gl.detachShader(this.shaderProgram,this.vertexShader),this.gl.deleteShader(this.vertexShader),this.vertexShader=null),this.fragmentShader&&(this.gl.detachShader(this.shaderProgram,this.fragmentShader),this.gl.deleteShader(this.fragmentShader),this.fragmentShader=null),this.gl.deleteProgram(this.shaderProgram),this.shaderProgram=null),this.gpuVSUniformsBuffer&&(this.gpuVSUniformsBuffer.destroy(),this.gpuVSUniformsBuffer=null);for(const e of this.emitters)for(const i of e.fsUnifrmsPerLayer)i.destroy();this.emitters=[]}initGL(e){this.gl=e,this.initShaders()}initGPUDevice(e){this.device=e,this.gpuShaderModule=e.createShaderModule({label:"ribbons shader module",code:mn}),this.vsBindGroupLayout=this.device.createBindGroupLayout({label:"ribbons vs bind group layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform",hasDynamicOffset:!1,minBindingSize:128}}]}),this.fsBindGroupLayout=this.device.createBindGroupLayout({label:"ribbons bind group layout2",entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!1,minBindingSize:48}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}}]}),this.gpuPipelineLayout=this.device.createPipelineLayout({label:"ribbons pipeline layout",bindGroupLayouts:[this.vsBindGroupLayout,this.fsBindGroupLayout]});const i=(r,n,o)=>e.createRenderPipeline({label:`ribbons pipeline ${r}`,layout:this.gpuPipelineLayout,vertex:{module:this.gpuShaderModule,buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]},{arrayStride:8,attributes:[{shaderLocation:1,offset:0,format:"float32x2"}]}]},fragment:{module:this.gpuShaderModule,targets:[{format:navigator.gpu.getPreferredCanvasFormat(),blend:n}]},depthStencil:o,primitive:{topology:"triangle-strip"}});this.gpuPipelines=[i("none",{color:{operation:"add",srcFactor:"one",dstFactor:"zero"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}},{depthWriteEnabled:!0,depthCompare:"less-equal",format:"depth24plus"}),i("transparent",{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one-minus-src-alpha"}},{depthWriteEnabled:!0,depthCompare:"less-equal",format:"depth24plus"}),i("blend",{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one-minus-src-alpha"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}),i("additive",{color:{operation:"add",srcFactor:"src",dstFactor:"one"},alpha:{operation:"add",srcFactor:"src",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}),i("addAlpha",{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one"},alpha:{operation:"add",srcFactor:"src-alpha",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}),i("modulate",{color:{operation:"add",srcFactor:"zero",dstFactor:"src"},alpha:{operation:"add",srcFactor:"zero",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}),i("modulate2x",{color:{operation:"add",srcFactor:"dst",dstFactor:"src"},alpha:{operation:"add",srcFactor:"zero",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"})],this.gpuVSUniformsBuffer=this.device.createBuffer({label:"ribbons vs uniforms",size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.gpuVSUniformsBindGroup=this.device.createBindGroup({layout:this.vsBindGroupLayout,entries:[{binding:0,resource:{buffer:this.gpuVSUniformsBuffer}}]})}update(e){for(const i of this.emitters)this.updateEmitter(i,e)}render(e,i){this.gl.useProgram(this.shaderProgram),this.gl.uniformMatrix4fv(this.shaderProgramLocations.pMatrixUniform,!1,i),this.gl.uniformMatrix4fv(this.shaderProgramLocations.mvMatrixUniform,!1,e),this.gl.enableVertexAttribArray(this.shaderProgramLocations.vertexPositionAttribute),this.gl.enableVertexAttribArray(this.shaderProgramLocations.textureCoordAttribute);for(const r of this.emitters){if(r.creationTimes.length<2)continue;this.gl.uniform4f(this.shaderProgramLocations.colorUniform,r.props.Color[0],r.props.Color[1],r.props.Color[2],this.interp.animVectorVal(r.props.Alpha,1)),this.setGeneralBuffers(r);const n=r.props.MaterialID,o=this.rendererData.model.Materials[n];for(let s=0;s<o.Layers.length;++s)this.setLayerProps(o.Layers[s],this.rendererData.materialLayerTextureID[n][s]),this.renderEmitter(r)}this.gl.disableVertexAttribArray(this.shaderProgramLocations.vertexPositionAttribute),this.gl.disableVertexAttribArray(this.shaderProgramLocations.textureCoordAttribute)}renderGPU(e,i,r){const n=new ArrayBuffer(128),o={mvMatrix:new Float32Array(n,0,16),pMatrix:new Float32Array(n,64,16)};o.mvMatrix.set(i),o.pMatrix.set(r),this.device.queue.writeBuffer(this.gpuVSUniformsBuffer,0,n);for(const s of this.emitters){if(s.creationTimes.length<2)continue;this.device.queue.writeBuffer(s.vertexGPUBuffer,0,s.vertices),this.device.queue.writeBuffer(s.texCoordGPUBuffer,0,s.texCoords),e.setVertexBuffer(0,s.vertexGPUBuffer),e.setVertexBuffer(1,s.texCoordGPUBuffer),e.setBindGroup(0,this.gpuVSUniformsBindGroup);const a=s.props.MaterialID,f=this.rendererData.model.Materials[a];for(let l=0;l<f.Layers.length;++l){const u=this.rendererData.materialLayerTextureID[a][l],g=this.rendererData.model.Textures[u],S=f.Layers[l],m=this.gpuPipelines[S.FilterMode]||this.gpuPipelines[0];e.setPipeline(m);const T=new ArrayBuffer(48),b={replaceableColor:new Float32Array(T,0,3),replaceableType:new Uint32Array(T,12,1),discardAlphaLevel:new Float32Array(T,16,1),color:new Float32Array(T,32,4)};b.replaceableColor.set(this.rendererData.teamColor),b.replaceableType.set([g.ReplaceableId||0]),b.discardAlphaLevel.set([S.FilterMode===z.Transparent?.75:0]),b.color.set([s.props.Color[0],s.props.Color[1],s.props.Color[2],this.interp.animVectorVal(s.props.Alpha,1)]),s.fsUnifrmsPerLayer[l]||(s.fsUnifrmsPerLayer[l]=this.device.createBuffer({label:`ribbons fs uniforms ${s.index} layer ${l}`,size:48,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}));const w=s.fsUnifrmsPerLayer[l];this.device.queue.writeBuffer(w,0,T);const c=this.device.createBindGroup({label:`ribbons fs uniforms ${s.index}`,layout:this.fsBindGroupLayout,entries:[{binding:0,resource:{buffer:w}},{binding:1,resource:this.rendererData.gpuSamplers[u]},{binding:2,resource:(this.rendererData.gpuTextures[g.Image]||this.rendererData.gpuEmptyTexture).createView()}]});e.setBindGroup(1,c),e.draw(s.creationTimes.length*2)}}}initShaders(){const e=this.vertexShader=Le(this.gl,dn,this.gl.VERTEX_SHADER),i=this.fragmentShader=Le(this.gl,gn,this.gl.FRAGMENT_SHADER),r=this.shaderProgram=this.gl.createProgram();this.gl.attachShader(r,e),this.gl.attachShader(r,i),this.gl.linkProgram(r),this.gl.getProgramParameter(r,this.gl.LINK_STATUS)||alert("Could not initialise shaders"),this.gl.useProgram(r),this.shaderProgramLocations.vertexPositionAttribute=this.gl.getAttribLocation(r,"aVertexPosition"),this.shaderProgramLocations.textureCoordAttribute=this.gl.getAttribLocation(r,"aTextureCoord"),this.shaderProgramLocations.pMatrixUniform=this.gl.getUniformLocation(r,"uPMatrix"),this.shaderProgramLocations.mvMatrixUniform=this.gl.getUniformLocation(r,"uMVMatrix"),this.shaderProgramLocations.samplerUniform=this.gl.getUniformLocation(r,"uSampler"),this.shaderProgramLocations.replaceableColorUniform=this.gl.getUniformLocation(r,"uReplaceableColor"),this.shaderProgramLocations.replaceableTypeUniform=this.gl.getUniformLocation(r,"uReplaceableType"),this.shaderProgramLocations.discardAlphaLevelUniform=this.gl.getUniformLocation(r,"uDiscardAlphaLevel"),this.shaderProgramLocations.colorUniform=this.gl.getUniformLocation(r,"uColor")}resizeEmitterBuffers(e,i){var o,s;if(i<=e.capacity)return;i=Math.min(i,e.baseCapacity);const r=new Float32Array(i*2*3),n=new Float32Array(i*2*2);e.vertices&&r.set(e.vertices),e.vertices=r,e.texCoords=n,e.capacity=i,this.gl?e.vertexBuffer||(e.vertexBuffer=this.gl.createBuffer(),e.texCoordBuffer=this.gl.createBuffer()):this.device&&((o=e.vertexGPUBuffer)==null||o.destroy(),(s=e.texCoordGPUBuffer)==null||s.destroy(),e.vertexGPUBuffer=this.device.createBuffer({label:`ribbon vertex buffer ${e.index}`,size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),e.texCoordGPUBuffer=this.device.createBuffer({label:`ribbon texCoord buffer ${e.index}`,size:n.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}))}updateEmitter(e,i){const r=Date.now();if(this.interp.animVectorVal(e.props.Visibility,0)>0){const o=e.props.EmissionRate;e.emission+=o*i,e.emission>=1e3&&(e.emission=e.emission%1e3,e.creationTimes.length+1>e.capacity&&this.resizeEmitterBuffers(e,e.creationTimes.length+1),this.appendVertices(e),e.creationTimes.push(r))}if(e.creationTimes.length)for(;e.creationTimes[0]+e.props.LifeSpan*1e3<r;){e.creationTimes.shift();for(let o=0;o+6+5<e.vertices.length;o+=6)e.vertices[o]=e.vertices[o+6],e.vertices[o+1]=e.vertices[o+7],e.vertices[o+2]=e.vertices[o+8],e.vertices[o+3]=e.vertices[o+9],e.vertices[o+4]=e.vertices[o+10],e.vertices[o+5]=e.vertices[o+11]}e.creationTimes.length&&this.updateEmitterTexCoords(e,r)}appendVertices(e){const i=d.clone(e.props.PivotPoint),r=d.clone(e.props.PivotPoint);i[1]-=this.interp.animVectorVal(e.props.HeightBelow,0),r[1]+=this.interp.animVectorVal(e.props.HeightAbove,0);const n=this.rendererData.nodes[e.props.ObjectId].matrix;d.transformMat4(i,i,n),d.transformMat4(r,r,n);const o=e.creationTimes.length;e.vertices[o*6]=i[0],e.vertices[o*6+1]=i[1],e.vertices[o*6+2]=i[2],e.vertices[o*6+3]=r[0],e.vertices[o*6+4]=r[1],e.vertices[o*6+5]=r[2]}updateEmitterTexCoords(e,i){for(let r=0;r<e.creationTimes.length;++r){let n=(i-e.creationTimes[r])/(e.props.LifeSpan*1e3);const o=this.interp.animVectorVal(e.props.TextureSlot,0),s=o%e.props.Columns,a=Math.floor(o/e.props.Rows),f=1/e.props.Columns,l=1/e.props.Rows;n=s*f+n*f,e.texCoords[r*2*2]=n,e.texCoords[r*2*2+1]=a*l,e.texCoords[r*2*2+2]=n,e.texCoords[r*2*2+3]=(1+a)*l}}setLayerProps(e,i){const r=this.rendererData.model.Textures[i];e.Shading&Ee.TwoSided?this.gl.disable(this.gl.CULL_FACE):this.gl.enable(this.gl.CULL_FACE),e.FilterMode===z.Transparent?this.gl.uniform1f(this.shaderProgramLocations.discardAlphaLevelUniform,.75):this.gl.uniform1f(this.shaderProgramLocations.discardAlphaLevelUniform,0),e.FilterMode===z.None?(this.gl.disable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.depthMask(!0)):e.FilterMode===z.Transparent?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.depthMask(!0)):e.FilterMode===z.Blend?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.depthMask(!1)):e.FilterMode===z.Additive?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFunc(this.gl.SRC_COLOR,this.gl.ONE),this.gl.depthMask(!1)):e.FilterMode===z.AddAlpha?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE),this.gl.depthMask(!1)):e.FilterMode===z.Modulate?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.ZERO,this.gl.SRC_COLOR,this.gl.ZERO,this.gl.ONE),this.gl.depthMask(!1)):e.FilterMode===z.Modulate2x&&(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.DST_COLOR,this.gl.SRC_COLOR,this.gl.ZERO,this.gl.ONE),this.gl.depthMask(!1)),r.Image?(this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.rendererData.textures[r.Image]),this.gl.uniform1i(this.shaderProgramLocations.samplerUniform,0),this.gl.uniform1f(this.shaderProgramLocations.replaceableTypeUniform,0)):(r.ReplaceableId===1||r.ReplaceableId===2)&&(this.gl.uniform3fv(this.shaderProgramLocations.replaceableColorUniform,this.rendererData.teamColor),this.gl.uniform1f(this.shaderProgramLocations.replaceableTypeUniform,r.ReplaceableId)),e.Shading&Ee.NoDepthTest&&this.gl.disable(this.gl.DEPTH_TEST),e.Shading&Ee.NoDepthSet&&this.gl.depthMask(!1)}setGeneralBuffers(e){this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e.texCoordBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,e.texCoords,this.gl.DYNAMIC_DRAW),this.gl.vertexAttribPointer(this.shaderProgramLocations.textureCoordAttribute,2,this.gl.FLOAT,!1,0,0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e.vertexBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,e.vertices,this.gl.DYNAMIC_DRAW),this.gl.vertexAttribPointer(this.shaderProgramLocations.vertexPositionAttribute,3,this.gl.FLOAT,!1,0,0)}renderEmitter(e){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,e.creationTimes.length*2)}}const vn=`attribute vec3 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;
attribute vec4 aGroup;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNodesMatrices[\${MAX_NODES}];

varying vec3 vNormal;
varying vec2 vTextureCoord;

void main(void) {
    vec4 position = vec4(aVertexPosition, 1.0);
    int count = 1;
    vec4 sum = uNodesMatrices[int(aGroup[0])] * position;

    if (aGroup[1] < \${MAX_NODES}.) {
        sum += uNodesMatrices[int(aGroup[1])] * position;
        count += 1;
    }
    if (aGroup[2] < \${MAX_NODES}.) {
        sum += uNodesMatrices[int(aGroup[2])] * position;
        count += 1;
    }
    if (aGroup[3] < \${MAX_NODES}.) {
        sum += uNodesMatrices[int(aGroup[3])] * position;
        count += 1;
    }
    sum.xyz /= float(count);
    sum.w = 1.;
    position = sum;

    gl_Position = uPMatrix * uMVMatrix * position;
    vTextureCoord = aTextureCoord;
    vNormal = aNormal;
}`,xn=`attribute vec3 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec3 vNormal;
varying vec2 vTextureCoord;

void main(void) {
    vec4 position = vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * uMVMatrix * position;
    vTextureCoord = aTextureCoord;
    vNormal = aNormal;
}`,bn=`precision mediump float;

varying vec3 vNormal;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec3 uReplaceableColor;
uniform float uReplaceableType;
uniform float uDiscardAlphaLevel;
uniform mat3 uTVertexAnim;
uniform float uWireframe;

float hypot (vec2 z) {
    float t;
    float x = abs(z.x);
    float y = abs(z.y);
    t = min(x, y);
    x = max(x, y);
    t = t / x;
    return (z.x == 0.0 && z.y == 0.0) ? 0.0 : x * sqrt(1.0 + t * t);
}

void main(void) {
    if (uWireframe > 0.) {
        gl_FragColor = vec4(1.);
        return;
    }

    vec2 texCoord = (uTVertexAnim * vec3(vTextureCoord.s, vTextureCoord.t, 1.)).st;

    if (uReplaceableType == 0.) {
        gl_FragColor = texture2D(uSampler, texCoord);
    } else if (uReplaceableType == 1.) {
        gl_FragColor = vec4(uReplaceableColor, 1.0);
    } else if (uReplaceableType == 2.) {
        float dist = hypot(texCoord - vec2(0.5, 0.5)) * 2.;
        float truncateDist = clamp(1. - dist * 1.4, 0., 1.);
        float alpha = sin(truncateDist);
        gl_FragColor = vec4(uReplaceableColor * alpha, 1.0);
    }

    // hand-made alpha-test
    if (gl_FragColor[3] < uDiscardAlphaLevel) {
        discard;
    }
}
`,Tn=`attribute vec3 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;
attribute vec4 aSkin;
attribute vec4 aBoneWeight;
attribute vec4 aTangent;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNodesMatrices[\${MAX_NODES}];

varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec2 vTextureCoord;
varying mat3 vTBN;
varying vec3 vFragPos;

void main(void) {
    vec4 position = vec4(aVertexPosition, 1.0);
    mat4 sum;

    // sum += uNodesMatrices[int(aSkin[0])] * 1.;
    sum += uNodesMatrices[int(aSkin[0])] * aBoneWeight[0];
    sum += uNodesMatrices[int(aSkin[1])] * aBoneWeight[1];
    sum += uNodesMatrices[int(aSkin[2])] * aBoneWeight[2];
    sum += uNodesMatrices[int(aSkin[3])] * aBoneWeight[3];

    mat3 rotation = mat3(sum);

    position = sum * position;
    position.w = 1.;

    gl_Position = uPMatrix * uMVMatrix * position;
    vTextureCoord = aTextureCoord;

    vec3 normal = aNormal;
    vec3 tangent = aTangent.xyz;

    // https://learnopengl.com/Advanced-Lighting/Normal-Mapping
    tangent = normalize(tangent - dot(tangent, normal) * normal);

    vec3 binormal = cross(normal, tangent) * aTangent.w;

    normal = normalize(rotation * normal);
    tangent = normalize(rotation * tangent);
    binormal = normalize(rotation * binormal);

    vNormal = normal;
    vTangent = tangent;
    vBinormal = binormal;

    vTBN = mat3(tangent, binormal, normal);

    vFragPos = position.xyz;
}`,Pn=`#version 300 es
in vec3 aVertexPosition;
in vec3 aNormal;
in vec2 aTextureCoord;
in vec4 aSkin;
in vec4 aBoneWeight;
in vec4 aTangent;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNodesMatrices[\${MAX_NODES}];

out vec3 vNormal;
out vec3 vTangent;
out vec3 vBinormal;
out vec2 vTextureCoord;
out mat3 vTBN;
out vec3 vFragPos;

void main(void) {
    vec4 position = vec4(aVertexPosition, 1.0);
    mat4 sum;

    // sum += uNodesMatrices[int(aSkin[0])] * 1.;
    sum += uNodesMatrices[int(aSkin[0])] * aBoneWeight[0];
    sum += uNodesMatrices[int(aSkin[1])] * aBoneWeight[1];
    sum += uNodesMatrices[int(aSkin[2])] * aBoneWeight[2];
    sum += uNodesMatrices[int(aSkin[3])] * aBoneWeight[3];

    mat3 rotation = mat3(sum);

    position = sum * position;
    position.w = 1.;

    gl_Position = uPMatrix * uMVMatrix * position;
    vTextureCoord = aTextureCoord;

    vec3 normal = aNormal;
    vec3 tangent = aTangent.xyz;

    // https://learnopengl.com/Advanced-Lighting/Normal-Mapping
    tangent = normalize(tangent - dot(tangent, normal) * normal);

    vec3 binormal = cross(normal, tangent) * aTangent.w;

    normal = normalize(rotation * normal);
    tangent = normalize(rotation * tangent);
    binormal = normalize(rotation * binormal);

    vNormal = normal;
    vTangent = tangent;
    vBinormal = binormal;

    vTBN = mat3(tangent, binormal, normal);

    vFragPos = position.xyz;
}`,Sn=`precision mediump float;

varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;
varying mat3 vTBN;
varying vec3 vFragPos;

uniform sampler2D uSampler;
uniform sampler2D uNormalSampler;
uniform sampler2D uOrmSampler;
uniform vec3 uReplaceableColor;
uniform float uDiscardAlphaLevel;
uniform mat3 uTVertexAnim;
uniform vec3 uLightPos;
uniform vec3 uLightColor;
uniform vec3 uCameraPos;
uniform vec3 uShadowParams;
uniform sampler2D uShadowMapSampler;
uniform mat4 uShadowMapLightMatrix;
uniform float uWireframe;

const float PI = 3.14159265359;
const float gamma = 2.2;

float distributionGGX(vec3 normal, vec3 halfWay, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float nDotH = max(dot(normal, halfWay), 0.0);
    float nDotH2 = nDotH * nDotH;

    float num = a2;
    float denom = (nDotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return num / denom;
}

float geometrySchlickGGX(float nDotV, float roughness) {
    float r = roughness + 1.;
    float k = r * r / 8.;
    // float k = roughness * roughness / 2.;

    float num = nDotV;
    float denom = nDotV * (1. - k) + k;

    return num / denom;
}

float geometrySmith(vec3 normal, vec3 viewDir, vec3 lightDir, float roughness) {
    float nDotV = max(dot(normal, viewDir), .0);
    float nDotL = max(dot(normal, lightDir), .0);
    float ggx2  = geometrySchlickGGX(nDotV, roughness);
    float ggx1  = geometrySchlickGGX(nDotL, roughness);

    return ggx1 * ggx2;
}

vec3 fresnelSchlick(float lightFactor, vec3 f0) {
    return f0 + (1. - f0) * pow(clamp(1. - lightFactor, 0., 1.), 5.);
}

void main(void) {
    if (uWireframe > 0.) {
        gl_FragColor = vec4(1.);
        return;
    }

    vec2 texCoord = (uTVertexAnim * vec3(vTextureCoord.s, vTextureCoord.t, 1.)).st;

    vec4 orm = texture2D(uOrmSampler, texCoord);

    float occlusion = orm.r;
    float roughness = orm.g;
    float metallic = orm.b;
    float teamColorFactor = orm.a;

    vec4 baseColor = texture2D(uSampler, texCoord);
    vec3 teamColor = baseColor.rgb * uReplaceableColor;
    baseColor.rgb = mix(baseColor.rgb, teamColor, teamColorFactor);
    baseColor.rgb = pow(baseColor.rgb, vec3(gamma));

    vec3 normal = texture2D(uNormalSampler, texCoord).rgb;
    normal = normal * 2.0 - 1.0;
    normal.x = -normal.x;
    normal.y = -normal.y;
    if (!gl_FrontFacing) {
        normal = -normal;
    }
    normal = normalize(vTBN * -normal);

    vec3 viewDir = normalize(uCameraPos - vFragPos);
    vec3 reflected = reflect(-viewDir, normal);

    vec3 lightDir = normalize(uLightPos - vFragPos);
    float lightFactor = max(dot(normal, lightDir), .0);
    vec3 radiance = uLightColor;

    vec3 f0 = vec3(.04);
    f0 = mix(f0, baseColor.rgb, metallic);

    vec3 totalLight = vec3(0.);
    vec3 halfWay = normalize(viewDir + lightDir);
    float ndf = distributionGGX(normal, halfWay, roughness);
    float g = geometrySmith(normal, viewDir, lightDir, roughness);
    vec3 f = fresnelSchlick(max(dot(halfWay, viewDir), 0.), f0);

    vec3 kS = f;
    // vec3 kD = vec3(1.) - kS;
    vec3 kD = vec3(1.);
    // kD *= 1.0 - metallic;
    vec3 num = ndf * g * f;
    float denom = 4. * max(dot(normal, viewDir), 0.) * max(dot(normal, lightDir), 0.) + .0001;
    vec3 specular = num / denom;

    totalLight = (kD * baseColor.rgb / PI + specular) * radiance * lightFactor;

    if (uShadowParams[0] > .5) {
        float shadowBias = uShadowParams[1];
        float shadowStep = uShadowParams[2];
        vec4 fragInLightPos = uShadowMapLightMatrix * vec4(vFragPos, 1.);
        vec3 shadowMapCoord = fragInLightPos.xyz / fragInLightPos.w;
        shadowMapCoord.xyz = (shadowMapCoord.xyz + 1.0) * .5;

        int passes = 5;
        float step = 1. / float(passes);

        float lightDepth = texture2D(uShadowMapSampler, shadowMapCoord.xy).r;
        float lightDepth0 = texture2D(uShadowMapSampler, vec2(shadowMapCoord.x + shadowStep, shadowMapCoord.y)).r;
        float lightDepth1 = texture2D(uShadowMapSampler, vec2(shadowMapCoord.x, shadowMapCoord.y + shadowStep)).r;
        float lightDepth2 = texture2D(uShadowMapSampler, vec2(shadowMapCoord.x, shadowMapCoord.y - shadowStep)).r;
        float lightDepth3 = texture2D(uShadowMapSampler, vec2(shadowMapCoord.x - shadowStep, shadowMapCoord.y)).r;
        float currentDepth = shadowMapCoord.z;

        float visibility = 0.;
        if (lightDepth > currentDepth - shadowBias) {
            visibility += step;
        }
        if (lightDepth0 > currentDepth - shadowBias) {
            visibility += step;
        }
        if (lightDepth1 > currentDepth - shadowBias) {
            visibility += step;
        }
        if (lightDepth2 > currentDepth - shadowBias) {
            visibility += step;
        }
        if (lightDepth3 > currentDepth - shadowBias) {
            visibility += step;
        }

        totalLight *= visibility;
    }

    vec3 color;

    vec3 ambient = vec3(.03);
    ambient *= baseColor.rgb * occlusion;
    color = ambient + totalLight;

    color = color / (vec3(1.) + color);
    color = pow(color, vec3(1. / gamma));

    gl_FragColor = vec4(color, 1.);

    // hand-made alpha-test
    if (gl_FragColor[3] < uDiscardAlphaLevel) {
        discard;
    }
}
`,En=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
in vec3 vNormal;
in vec3 vTangent;
in vec3 vBinormal;
in mat3 vTBN;
in vec3 vFragPos;

out vec4 FragColor;

uniform sampler2D uSampler;
uniform sampler2D uNormalSampler;
uniform sampler2D uOrmSampler;
uniform vec3 uReplaceableColor;
uniform float uDiscardAlphaLevel;
uniform mat3 uTVertexAnim;
uniform vec3 uLightPos;
uniform vec3 uLightColor;
uniform vec3 uCameraPos;
uniform vec3 uShadowParams;
uniform sampler2D uShadowMapSampler;
uniform mat4 uShadowMapLightMatrix;
uniform bool uHasEnv;
uniform samplerCube uIrradianceMap;
uniform samplerCube uPrefilteredEnv;
uniform sampler2D uBRDFLUT;
uniform float uWireframe;

const float PI = 3.14159265359;
const float gamma = 2.2;
const float MAX_REFLECTION_LOD = \${MAX_ENV_MIP_LEVELS};

float distributionGGX(vec3 normal, vec3 halfWay, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float nDotH = max(dot(normal, halfWay), 0.0);
    float nDotH2 = nDotH * nDotH;

    float num = a2;
    float denom = (nDotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return num / denom;
}

float geometrySchlickGGX(float nDotV, float roughness) {
    float r = roughness + 1.;
    float k = r * r / 8.;
    // float k = roughness * roughness / 2.;

    float num = nDotV;
    float denom = nDotV * (1. - k) + k;

    return num / denom;
}

float geometrySmith(vec3 normal, vec3 viewDir, vec3 lightDir, float roughness) {
    float nDotV = max(dot(normal, viewDir), .0);
    float nDotL = max(dot(normal, lightDir), .0);
    float ggx2  = geometrySchlickGGX(nDotV, roughness);
    float ggx1  = geometrySchlickGGX(nDotL, roughness);

    return ggx1 * ggx2;
}

vec3 fresnelSchlick(float lightFactor, vec3 f0) {
    return f0 + (1. - f0) * pow(clamp(1. - lightFactor, 0., 1.), 5.);
}

vec3 fresnelSchlickRoughness(float lightFactor, vec3 f0, float roughness) {
    return f0 + (max(vec3(1.0 - roughness), f0) - f0) * pow(clamp(1.0 - lightFactor, 0.0, 1.0), 5.0);
}

void main(void) {
    if (uWireframe > 0.) {
        FragColor = vec4(1.);
        return;
    }

    vec2 texCoord = (uTVertexAnim * vec3(vTextureCoord.s, vTextureCoord.t, 1.)).st;

    vec4 orm = texture(uOrmSampler, texCoord);

    float occlusion = orm.r;
    float roughness = orm.g;
    float metallic = orm.b;
    float teamColorFactor = orm.a;

    vec4 baseColor = texture(uSampler, texCoord);
    vec3 teamColor = baseColor.rgb * uReplaceableColor;
    baseColor.rgb = mix(baseColor.rgb, teamColor, teamColorFactor);
    baseColor.rgb = pow(baseColor.rgb, vec3(gamma));

    vec3 normal = texture(uNormalSampler, texCoord).rgb;
    normal = normal * 2.0 - 1.0;
    normal.x = -normal.x;
    normal.y = -normal.y;
    if (!gl_FrontFacing) {
        normal = -normal;
    }
    normal = normalize(vTBN * -normal);

    vec3 viewDir = normalize(uCameraPos - vFragPos);
    vec3 reflected = reflect(-viewDir, normal);

    vec3 lightDir = normalize(uLightPos - vFragPos);
    float lightFactor = max(dot(normal, lightDir), .0);
    vec3 radiance = uLightColor;

    vec3 f0 = vec3(.04);
    f0 = mix(f0, baseColor.rgb, metallic);

    vec3 totalLight = vec3(0.);
    vec3 halfWay = normalize(viewDir + lightDir);
    float ndf = distributionGGX(normal, halfWay, roughness);
    float g = geometrySmith(normal, viewDir, lightDir, roughness);
    vec3 f = fresnelSchlick(max(dot(halfWay, viewDir), 0.), f0);

    vec3 kS = f;
    vec3 kD = vec3(1.);// - kS;
    if (uHasEnv) {
        kD *= 1.0 - metallic;
    }
    vec3 num = ndf * g * f;
    float denom = 4. * max(dot(normal, viewDir), 0.) * max(dot(normal, lightDir), 0.) + .0001;
    vec3 specular = num / denom;

    totalLight = (kD * baseColor.rgb / PI + specular) * radiance * lightFactor;

    if (uShadowParams[0] > .5) {
        float shadowBias = uShadowParams[1];
        float shadowStep = uShadowParams[2];
        vec4 fragInLightPos = uShadowMapLightMatrix * vec4(vFragPos, 1.);
        vec3 shadowMapCoord = fragInLightPos.xyz / fragInLightPos.w;
        shadowMapCoord.xyz = (shadowMapCoord.xyz + 1.0) * .5;

        int passes = 5;
        float step = 1. / float(passes);

        float lightDepth = texture(uShadowMapSampler, shadowMapCoord.xy).r;
        float lightDepth0 = texture(uShadowMapSampler, vec2(shadowMapCoord.x + shadowStep, shadowMapCoord.y)).r;
        float lightDepth1 = texture(uShadowMapSampler, vec2(shadowMapCoord.x, shadowMapCoord.y + shadowStep)).r;
        float lightDepth2 = texture(uShadowMapSampler, vec2(shadowMapCoord.x, shadowMapCoord.y - shadowStep)).r;
        float lightDepth3 = texture(uShadowMapSampler, vec2(shadowMapCoord.x - shadowStep, shadowMapCoord.y)).r;
        float currentDepth = shadowMapCoord.z;

        float visibility = 0.;
        if (lightDepth > currentDepth - shadowBias) {
            visibility += step;
        }
        if (lightDepth0 > currentDepth - shadowBias) {
            visibility += step;
        }
        if (lightDepth1 > currentDepth - shadowBias) {
            visibility += step;
        }
        if (lightDepth2 > currentDepth - shadowBias) {
            visibility += step;
        }
        if (lightDepth3 > currentDepth - shadowBias) {
            visibility += step;
        }

        totalLight *= visibility;
    }

    vec3 color;

    if (uHasEnv) {
        vec3 f = fresnelSchlickRoughness(max(dot(normal, viewDir), 0.0), f0, roughness);
        vec3 kS = f;
        vec3 kD = vec3(1.0) - kS;
        kD *= 1.0 - metallic;

        vec3 diffuse = texture(uIrradianceMap, normal).rgb * baseColor.rgb;
        vec3 prefilteredColor = textureLod(uPrefilteredEnv, reflected, roughness * MAX_REFLECTION_LOD).rgb;
        vec2 envBRDF = texture(uBRDFLUT, vec2(max(dot(normal, viewDir), 0.0), roughness)).rg;
        specular = prefilteredColor * (f * envBRDF.x + envBRDF.y);

        vec3 ambient = (kD * diffuse + specular) * occlusion;
        color = ambient + totalLight;
    } else {
        vec3 ambient = vec3(.03);
        ambient *= baseColor.rgb * occlusion;
        color = ambient + totalLight;
    }

    color = color / (vec3(1.) + color);
    color = pow(color, vec3(1. / gamma));

    FragColor = vec4(color, baseColor.a);

    // hand-made alpha-test
    if (FragColor[3] < uDiscardAlphaLevel) {
        discard;
    }
}
`,An=`attribute vec3 aVertexPosition;
attribute vec3 aColor;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec3 vColor;

void main(void) {
    vec4 position = vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * uMVMatrix * position;
    vColor = aColor;
}`,Un=`precision mediump float;

varying vec3 vColor;

void main(void) {
    gl_FragColor = vec4(vColor, 1.0);
}`,yn=`attribute vec3 aPos;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec3 vLocalPos;

void main(void) {
    vLocalPos = aPos;
    gl_Position = uPMatrix * uMVMatrix * vec4(aPos, 1.0);
}`,Cn=`precision mediump float;

varying vec3 vLocalPos;

uniform sampler2D uEquirectangularMap;

const vec2 invAtan = vec2(0.1591, 0.3183);

vec2 SampleSphericalMap(vec3 v) {
    // vec2 uv = vec2(atan(v.z, v.x), asin(v.y));
    vec2 uv = vec2(atan(v.x, v.y), asin(-v.z));
    uv *= invAtan;
    uv += 0.5;
    return uv;
}

void main(void) {
    vec2 uv = SampleSphericalMap(normalize(vLocalPos)); // make sure to normalize localPos
    vec3 color = texture2D(uEquirectangularMap, uv).rgb;

    gl_FragColor = vec4(color, 1.0);
}`,Bn=`#version 300 es

in vec3 aPos;
out vec3 vLocalPos;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void) {
    vLocalPos = aPos;
    mat4 rotView = mat4(mat3(uMVMatrix)); // remove translation from the view matrix
    vec4 clipPos = uPMatrix * rotView * 1000. * vec4(aPos, 1.0);

    gl_Position = clipPos.xyww;
}`,Dn=`#version 300 es
precision mediump float;

in vec3 vLocalPos;

out vec4 FragColor;

uniform samplerCube uEnvironmentMap;

void main(void) {
    // vec3 envColor = textureLod(uEnvironmentMap, vLocalPos, 0.0).rgb;
    vec3 envColor = texture(uEnvironmentMap, vLocalPos).rgb;

    FragColor = vec4(envColor, 1.0);
}`,Ln=`attribute vec3 aPos;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec3 vLocalPos;

void main(void) {
    vLocalPos = aPos;
    gl_Position = uPMatrix * uMVMatrix * vec4(aPos, 1.0);
}`,Fn=`precision mediump float;

varying vec3 vLocalPos;

uniform samplerCube uEnvironmentMap;

const float PI = 3.14159265359;
const float gamma = 2.2;

void main(void) {
    vec3 irradiance = vec3(0.0);

    // the sample direction equals the hemisphere's orientation
    vec3 normal = normalize(vLocalPos);

    vec3 up    = vec3(0.0, 1.0, 0.0);
    vec3 right = normalize(cross(up, normal));
    up         = normalize(cross(normal, right));

    const float sampleDelta = 0.025;
    float nrSamples = 0.0;
    for(float phi = 0.0; phi < 2.0 * PI; phi += sampleDelta)
    {
        for(float theta = 0.0; theta < 0.5 * PI; theta += sampleDelta)
        {
            // spherical to cartesian (in tangent space)
            vec3 tangentSample = vec3(sin(theta) * cos(phi),  sin(theta) * sin(phi), cos(theta));
            // tangent space to world
            vec3 sampleVec = tangentSample.x * right + tangentSample.y * up + tangentSample.z * normal;

            irradiance += pow(textureCube(uEnvironmentMap, sampleVec).rgb, vec3(gamma)) * cos(theta) * sin(theta);
            nrSamples++;
        }
    }
    irradiance = PI * irradiance * (1.0 / float(nrSamples));

    gl_FragColor = vec4(irradiance, 1.0);
}`,Mn=`#version 300 es

in vec3 aPos;

out vec3 vLocalPos;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void) {
    vLocalPos = aPos;
    gl_Position = uPMatrix * uMVMatrix * vec4(aPos, 1.0);
}`,Vn=`#version 300 es
precision mediump float;

out vec4 FragColor;

in vec3 vLocalPos;

uniform samplerCube uEnvironmentMap;
uniform float uRoughness;

const float PI = 3.14159265359;
const float gamma = 2.2;

float RadicalInverse_VdC(uint bits) {
    bits = (bits << 16u) | (bits >> 16u);
    bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
    bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
    bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
    bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
    return float(bits) * 2.3283064365386963e-10; // / 0x100000000
}

vec2 Hammersley(uint i, uint N) {
    return vec2(float(i)/float(N), RadicalInverse_VdC(i));
}

vec3 ImportanceSampleGGX(vec2 Xi, vec3 N, float roughness) {
    float a = roughness * roughness;

    float phi = 2.0 * PI * Xi.x;
    float cosTheta = sqrt((1.0 - Xi.y) / (1.0 + (a*a - 1.0) * Xi.y));
    float sinTheta = sqrt(1.0 - cosTheta*cosTheta);

    // from spherical coordinates to cartesian coordinates
    vec3 H;
    H.x = cos(phi) * sinTheta;
    H.y = sin(phi) * sinTheta;
    H.z = cosTheta;

    // from tangent-space vector to world-space sample vector
    vec3 up        = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
    vec3 tangent   = normalize(cross(up, N));
    vec3 bitangent = cross(N, tangent);

    vec3 sampleVec = tangent * H.x + bitangent * H.y + N * H.z;

    return normalize(sampleVec);
}

void main() {
    vec3 N = normalize(vLocalPos);
    vec3 R = N;
    vec3 V = R;

    const uint SAMPLE_COUNT = 1024u;
    float totalWeight = 0.0;
    vec3 prefilteredColor = vec3(0.0);
    for(uint i = 0u; i < SAMPLE_COUNT; ++i)
    {
        vec2 Xi = Hammersley(i, SAMPLE_COUNT);
        vec3 H  = ImportanceSampleGGX(Xi, N, uRoughness);
        vec3 L  = normalize(2.0 * dot(V, H) * H - V);

        float NdotL = max(dot(N, L), 0.0);
        if(NdotL > 0.0) {
            prefilteredColor += pow(texture(uEnvironmentMap, L).rgb, vec3(gamma)) * NdotL;
            totalWeight      += NdotL;
        }
    }
    prefilteredColor = prefilteredColor / totalWeight;

    FragColor = vec4(prefilteredColor, 1.0);
}`,Rn=`#version 300 es

in vec3 aPos;

out vec2 vLocalPos;

void main(void) {
    vLocalPos = aPos.xy;
    gl_Position = vec4(aPos, 1.0);
}`,wn=`#version 300 es
precision mediump float;

in vec2 vLocalPos;

out vec4 FragColor;

const float PI = 3.14159265359;

float RadicalInverse_VdC(uint bits) {
    bits = (bits << 16u) | (bits >> 16u);
    bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
    bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
    bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
    bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
    return float(bits) * 2.3283064365386963e-10; // / 0x100000000
}

vec2 Hammersley(uint i, uint N) {
    return vec2(float(i)/float(N), RadicalInverse_VdC(i));
}

vec3 ImportanceSampleGGX(vec2 Xi, vec3 N, float roughness) {
    float a = roughness * roughness;

    float phi = 2.0 * PI * Xi.x;
    float cosTheta = sqrt((1.0 - Xi.y) / (1.0 + (a*a - 1.0) * Xi.y));
    float sinTheta = sqrt(1.0 - cosTheta*cosTheta);

    // from spherical coordinates to cartesian coordinates
    vec3 H;
    H.x = cos(phi) * sinTheta;
    H.y = sin(phi) * sinTheta;
    H.z = cosTheta;

    // from tangent-space vector to world-space sample vector
    vec3 up        = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
    vec3 tangent   = normalize(cross(up, N));
    vec3 bitangent = cross(N, tangent);

    vec3 sampleVec = tangent * H.x + bitangent * H.y + N * H.z;

    return normalize(sampleVec);
}

float geometrySchlickGGX(float nDotV, float roughness) {
    float r = roughness;
    float k = r * r / 2.;

    float num = nDotV;
    float denom = nDotV * (1. - k) + k;

    return num / denom;
}

float geometrySmith(vec3 normal, vec3 viewDir, vec3 lightDir, float roughness) {
    float nDotV = max(dot(normal, viewDir), .0);
    float nDotL = max(dot(normal, lightDir), .0);
    float ggx2  = geometrySchlickGGX(nDotV, roughness);
    float ggx1  = geometrySchlickGGX(nDotL, roughness);

    return ggx1 * ggx2;
}

vec2 IntegrateBRDF(float NdotV, float roughness) {
    vec3 V;
    V.x = sqrt(1.0 - NdotV*NdotV);
    V.y = 0.0;
    V.z = NdotV;

    float A = 0.0;
    float B = 0.0;

    vec3 N = vec3(0.0, 0.0, 1.0);

    const uint SAMPLE_COUNT = 1024u;
    for(uint i = 0u; i < SAMPLE_COUNT; ++i)
    {
        vec2 Xi = Hammersley(i, SAMPLE_COUNT);
        vec3 H  = ImportanceSampleGGX(Xi, N, roughness);
        vec3 L  = normalize(2.0 * dot(V, H) * H - V);

        float NdotL = max(L.z, 0.0);
        float NdotH = max(H.z, 0.0);
        float VdotH = max(dot(V, H), 0.0);

        if(NdotL > 0.0)
        {
            float G = geometrySmith(N, V, L, roughness);
            float G_Vis = (G * VdotH) / (NdotH * NdotV);
            float Fc = pow(1.0 - VdotH, 5.0);

            A += (1.0 - Fc) * G_Vis;
            B += Fc * G_Vis;
        }
    }
    A /= float(SAMPLE_COUNT);
    B /= float(SAMPLE_COUNT);
    return vec2(A, B);
}

void main() {
    FragColor = vec4(IntegrateBRDF((vLocalPos.x + 1.0) * .5, (vLocalPos.y + 1.0) * .5), 0., 1.);
}`,_n=`struct VSUniforms {
    mvMatrix: mat4x4f,
    pMatrix: mat4x4f,
    nodesMatrices: array<mat4x4f, \${MAX_NODES}>,
}

struct FSUniforms {
    replaceableColor: vec3f,
    replaceableType: u32,
    discardAlphaLevel: f32,
    wireframe: u32,
    tVertexAnim: mat3x3f,
}

@group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;
@group(1) @binding(0) var<uniform> fsUniforms: FSUniforms;
@group(1) @binding(1) var fsUniformSampler: sampler;
@group(1) @binding(2) var fsUniformTexture: texture_2d<f32>;

struct VSIn {
    @location(0) vertexPosition: vec3f,
    @location(1) normal: vec3f,
    @location(2) textureCoord: vec2f,
    @location(3) group: vec4<u32>,
}

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) normal: vec3f,
    @location(1) textureCoord: vec2f,
}

@vertex fn vs(
    in: VSIn
) -> VSOut {
    var position: vec4f = vec4f(in.vertexPosition, 1.0);
    var count: i32 = 1;
    var sum: vec4f = vsUniforms.nodesMatrices[in.group[0]] * position;

    if (in.group[1] < \${MAX_NODES}) {
        sum += vsUniforms.nodesMatrices[in.group[1]] * position;
        count += 1;
    }
    if (in.group[2] < \${MAX_NODES}) {
        sum += vsUniforms.nodesMatrices[in.group[2]] * position;
        count += 1;
    }
    if (in.group[3] < \${MAX_NODES}) {
        sum += vsUniforms.nodesMatrices[in.group[3]] * position;
        count += 1;
    }
    sum /= f32(count);
    sum.w = 1.;
    position = sum;

    var out: VSOut;
    out.position = vsUniforms.pMatrix * vsUniforms.mvMatrix * position;
    out.textureCoord = in.textureCoord;
    out.normal = in.normal;
    return out;
}

fn hypot(z: vec2f) -> f32 {
    var t: f32 = 0;
    var x: f32 = abs(z.x);
    let y: f32 = abs(z.y);
    t = min(x, y);
    x = max(x, y);
    t = t / x;
    if (z.x == 0.0 && z.y == 0.0) {
        return 0.0;
    }
    return x * sqrt(1.0 + t * t);
}

@fragment fn fs(
    in: VSOut
) -> @location(0) vec4f {
    if (fsUniforms.wireframe > 0) {
        return vec4f(1);
    }

    let texCoord: vec2f = (fsUniforms.tVertexAnim * vec3f(in.textureCoord.x, in.textureCoord.y, 1.)).xy;
    var color: vec4f = vec4f(0.0);

    if (fsUniforms.replaceableType == 0) {
        color = textureSample(fsUniformTexture, fsUniformSampler, texCoord);
    } else if (fsUniforms.replaceableType == 1) {
        color = vec4f(fsUniforms.replaceableColor, 1.0);
    } else if (fsUniforms.replaceableType == 2) {
        let dist: f32 = hypot(texCoord - vec2(0.5, 0.5)) * 2.;
        let truncateDist: f32 = clamp(1. - dist * 1.4, 0., 1.);
        let alpha: f32 = sin(truncateDist);
        color = vec4f(fsUniforms.replaceableColor * alpha, 1.0);
    }

    // hand-made alpha-test
    if (color.a < fsUniforms.discardAlphaLevel) {
        discard;
    }

    return color;
}
`,Gn=`struct VSUniforms {
    mvMatrix: mat4x4f,
    pMatrix: mat4x4f,
    nodesMatrices: array<mat4x4f, \${MAX_NODES}>,
}

struct FSUniforms {
    replaceableColor: vec3f,
    // replaceableType: u32,
    discardAlphaLevel: f32,
    tVertexAnim: mat3x3f,
    lightPos: vec3f,
    hasEnv: u32,
    lightColor: vec3f,
    wireframe: u32,
    cameraPos: vec3f,
    shadowParams: vec3f,
    shadowMapLightMatrix: mat4x4f,
}

@group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;
@group(1) @binding(0) var<uniform> fsUniforms: FSUniforms;
@group(1) @binding(1) var fsUniformDiffuseSampler: sampler;
@group(1) @binding(2) var fsUniformDiffuseTexture: texture_2d<f32>;
@group(1) @binding(3) var fsUniformNormalSampler: sampler;
@group(1) @binding(4) var fsUniformNormalTexture: texture_2d<f32>;
@group(1) @binding(5) var fsUniformOrmSampler: sampler;
@group(1) @binding(6) var fsUniformOrmTexture: texture_2d<f32>;
@group(1) @binding(7) var fsUniformShadowSampler: sampler_comparison;
@group(1) @binding(8) var fsUniformShadowTexture: texture_depth_2d;
@group(1) @binding(9) var irradienceMapSampler: sampler;
@group(1) @binding(10) var irradienceMapTexture: texture_cube<f32>;
@group(1) @binding(11) var prefilteredEnvSampler: sampler;
@group(1) @binding(12) var prefilteredEnvTexture: texture_cube<f32>;
@group(1) @binding(13) var brdfLutSampler: sampler;
@group(1) @binding(14) var brdfLutTexture: texture_2d<f32>;

struct VSIn {
    @location(0) vertexPosition: vec3f,
    @location(1) normal: vec3f,
    @location(2) textureCoord: vec2f,
    @location(3) tangent: vec4f,
    @location(4) skin: vec4<u32>,
    @location(5) boneWeight: vec4f,
}

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) normal: vec3f,
    @location(1) textureCoord: vec2f,
    @location(2) tangent: vec3f,
    @location(3) binormal: vec3f,
    @location(4) fragPos: vec3f,
}

@vertex fn vs(
    in: VSIn
) -> VSOut {
    var position: vec4f = vec4f(in.vertexPosition, 1.0);
    var sum: mat4x4f;

    sum += vsUniforms.nodesMatrices[in.skin[0]] * in.boneWeight[0];
    sum += vsUniforms.nodesMatrices[in.skin[1]] * in.boneWeight[1];
    sum += vsUniforms.nodesMatrices[in.skin[2]] * in.boneWeight[2];
    sum += vsUniforms.nodesMatrices[in.skin[3]] * in.boneWeight[3];

    let rotation: mat3x3f = mat3x3f(sum[0].xyz, sum[1].xyz, sum[2].xyz);

    position = sum * position;
    position.w = 1;

    var out: VSOut;
    out.position = vsUniforms.pMatrix * vsUniforms.mvMatrix * position;
    out.textureCoord = in.textureCoord;
    out.normal = in.normal;

    var normal: vec3f = in.normal;
    var tangent: vec3f = in.tangent.xyz;

    // https://learnopengl.com/Advanced-Lighting/Normal-Mapping
    tangent = normalize(tangent - dot(tangent, normal) * normal);

    var binormal: vec3f = cross(normal, tangent) * in.tangent.w;

    normal = normalize(rotation * normal);
    tangent = normalize(rotation * tangent);
    binormal = normalize(rotation * binormal);

    out.normal = normal;
    out.tangent = tangent;
    out.binormal = binormal;

    out.fragPos = position.xyz;

    return out;
}

fn hypot(z: vec2f) -> f32 {
    var t: f32 = 0;
    var x: f32 = abs(z.x);
    let y: f32 = abs(z.y);
    t = min(x, y);
    x = max(x, y);
    t = t / x;
    if (z.x == 0.0 && z.y == 0.0) {
        return 0.0;
    }
    return x * sqrt(1.0 + t * t);
}

const PI: f32 = 3.14159265359;
const gamma: f32 = 2.2;
const MAX_REFLECTION_LOD: f32 = \${MAX_ENV_MIP_LEVELS};

fn distributionGGX(normal: vec3f, halfWay: vec3f, roughness: f32) -> f32 {
    let a: f32 = roughness * roughness;
    let a2: f32 = a * a;
    let nDotH: f32 = max(dot(normal, halfWay), 0.0);
    let nDotH2: f32 = nDotH * nDotH;

    let num: f32 = a2;
    var denom: f32 = (nDotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return num / denom;
}

fn geometrySchlickGGX(nDotV: f32, roughness: f32) -> f32 {
    let r: f32 = roughness + 1.;
    let k: f32 = r * r / 8.;
    // float k = roughness * roughness / 2.;

    let num: f32 = nDotV;
    let denom: f32 = nDotV * (1. - k) + k;

    return num / denom;
}

fn geometrySmith(normal: vec3f, viewDir: vec3f, lightDir: vec3f, roughness: f32) -> f32 {
    let nDotV: f32 = max(dot(normal, viewDir), .0);
    let nDotL: f32 = max(dot(normal, lightDir), .0);
    let ggx2: f32  = geometrySchlickGGX(nDotV, roughness);
    let ggx1: f32  = geometrySchlickGGX(nDotL, roughness);

    return ggx1 * ggx2;
}

fn fresnelSchlick(lightFactor: f32, f0: vec3f) -> vec3f {
    return f0 + (1. - f0) * pow(clamp(1. - lightFactor, 0., 1.), 5.);
}

fn fresnelSchlickRoughness(lightFactor: f32, f0: vec3f, roughness: f32) -> vec3f {
    return f0 + (max(vec3(1.0 - roughness), f0) - f0) * pow(clamp(1.0 - lightFactor, 0.0, 1.0), 5.0);
}

@fragment fn fs(
    in: VSOut,
    @builtin(front_facing) isFront: bool
) -> @location(0) vec4f {
    if (fsUniforms.wireframe > 0) {
        return vec4f(1);
    }

    let texCoord: vec2f = (fsUniforms.tVertexAnim * vec3f(in.textureCoord.x, in.textureCoord.y, 1.)).xy;
    var baseColor: vec4f = textureSample(fsUniformDiffuseTexture, fsUniformDiffuseSampler, texCoord);

    // hand-made alpha-test
    if (baseColor.a < fsUniforms.discardAlphaLevel) {
        discard;
    }

    let orm: vec4f = textureSample(fsUniformOrmTexture, fsUniformOrmSampler, texCoord);

    let occlusion: f32 = orm.r;
    let roughness: f32 = orm.g;
    let metallic: f32 = orm.b;
    let teamColorFactor: f32 = orm.a;

    var teamColor: vec3f = baseColor.rgb * fsUniforms.replaceableColor;
    baseColor = vec4(mix(baseColor.rgb, teamColor, teamColorFactor), baseColor.a);
    baseColor = vec4(pow(baseColor.rgb, vec3f(gamma)), baseColor.a);

    let TBN: mat3x3f = mat3x3f(in.tangent, in.binormal, in.normal);

    var normal: vec3f = textureSample(fsUniformNormalTexture, fsUniformNormalSampler, texCoord).xyz;
    normal = normal * 2 - 1;
    normal.x = -normal.x;
    normal.y = -normal.y;
    if (!isFront) {
        normal = -normal;
    }
    normal = normalize(TBN * -normal);

    let viewDir: vec3f = normalize(fsUniforms.cameraPos - in.fragPos);
    let reflected = reflect(-viewDir, normal);

    let lightDir: vec3f = normalize(fsUniforms.lightPos - in.fragPos);
    let lightFactor: f32 = max(dot(normal, lightDir), 0);
    let radiance: vec3f = fsUniforms.lightColor;

    var f0 = vec3f(.04);
    f0 = mix(f0, baseColor.rgb, metallic);

    var totalLight: vec3f = vec3f(0);
    let halfWay: vec3f = normalize(viewDir + lightDir);
    let ndf: f32 = distributionGGX(normal, halfWay, roughness);
    let g: f32 = geometrySmith(normal, viewDir, lightDir, roughness);
    let f: vec3f = fresnelSchlick(max(dot(halfWay, viewDir), 0), f0);

    let kS = f;
    var kD = vec3f(1);// - kS;
    if (fsUniforms.hasEnv > 0) {
        kD *= 1 - metallic;
    }
    let num: vec3f = ndf * g * f;
    let denom: f32 = 4. * max(dot(normal, viewDir), 0.) * max(dot(normal, lightDir), 0.) + .0001;
    var specular: vec3f = num / denom;

    totalLight = (kD * baseColor.rgb / PI + specular) * radiance * lightFactor;

    if (fsUniforms.shadowParams[0] > .5) {
        let shadowBias: f32 = fsUniforms.shadowParams[1];
        let shadowStep: f32 = fsUniforms.shadowParams[2];
        let fragInLightPos: vec4f = fsUniforms.shadowMapLightMatrix * vec4f(in.fragPos, 1.);
        var shadowMapCoord: vec3f = fragInLightPos.xyz / fragInLightPos.w;
        shadowMapCoord = vec3f((shadowMapCoord.xy + 1) * .5, shadowMapCoord.z);
        shadowMapCoord.y = 1 - shadowMapCoord.y;

        let passes: u32 = 5;
        let step: f32 = 1. / f32(passes);

        let currentDepth: f32 = shadowMapCoord.z;
        var lightDepth: f32 = textureSampleCompare(fsUniformShadowTexture, fsUniformShadowSampler, shadowMapCoord.xy, currentDepth - shadowBias);
        let lightDepth0: f32 = textureSampleCompare(fsUniformShadowTexture, fsUniformShadowSampler, vec2f(shadowMapCoord.x + shadowStep, shadowMapCoord.y), currentDepth - shadowBias);
        let lightDepth1: f32 = textureSampleCompare(fsUniformShadowTexture, fsUniformShadowSampler, vec2f(shadowMapCoord.x, shadowMapCoord.y + shadowStep), currentDepth - shadowBias);
        let lightDepth2: f32 = textureSampleCompare(fsUniformShadowTexture, fsUniformShadowSampler, vec2f(shadowMapCoord.x, shadowMapCoord.y - shadowStep), currentDepth - shadowBias);
        let lightDepth3: f32 = textureSampleCompare(fsUniformShadowTexture, fsUniformShadowSampler, vec2f(shadowMapCoord.x - shadowStep, shadowMapCoord.y), currentDepth - shadowBias);

        var visibility: f32 = 0.;
        if (lightDepth > .5) {
            visibility += step;
        }
        if (lightDepth0 > .5) {
            visibility += step;
        }
        if (lightDepth1 > .5) {
            visibility += step;
        }
        if (lightDepth2 > .5) {
            visibility += step;
        }
        if (lightDepth3 > .5) {
            visibility += step;
        }

        totalLight *= visibility;
    }

    var color: vec3f = vec3f(0.0);

    if (fsUniforms.hasEnv > 0) {
        let f: vec3f = fresnelSchlickRoughness(max(dot(normal, viewDir), 0.0), f0, roughness);
        let kS: vec3f = f;
        var kD: vec3f = vec3f(1.0) - kS;
        kD *= 1.0 - metallic;

        let diffuse: vec3f = textureSample(irradienceMapTexture, irradienceMapSampler, normal).rgb * baseColor.rgb;
        let prefilteredColor: vec3f = textureSampleLevel(prefilteredEnvTexture, prefilteredEnvSampler, reflected, roughness * MAX_REFLECTION_LOD).rgb;
        let envBRDF: vec2f = textureSample(brdfLutTexture, brdfLutSampler, vec2f(max(dot(normal, viewDir), 0.0), roughness)).rg;
        specular = prefilteredColor * (f * envBRDF.x + envBRDF.y);

        let ambient: vec3f = (kD * diffuse + specular) * occlusion;
        color = ambient + totalLight;
    } else {
        var ambient: vec3f = vec3(.03);
        ambient *= baseColor.rgb * occlusion;
        color = ambient + totalLight;
    }

    color = color / (vec3f(1) + color);
    color = pow(color, vec3f(1 / gamma));

    return vec4f(color, baseColor.a);
}
`,In=`struct VSUniforms {
    mvMatrix: mat4x4f,
    pMatrix: mat4x4f,
    nodesMatrices: array<mat4x4f, \${MAX_NODES}>,
}

struct FSUniforms {
    replaceableColor: vec3f,
    // replaceableType: u32,
    discardAlphaLevel: f32,
    tVertexAnim: mat3x3f,
    lightPos: vec3f,
    lightColor: vec3f,
    cameraPos: vec3f,
    shadowParams: vec3f,
    shadowMapLightMatrix: mat4x4f,
    // env
}

@group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;
@group(1) @binding(0) var<uniform> fsUniforms: FSUniforms;
@group(1) @binding(1) var fsUniformDiffuseSampler: sampler;
@group(1) @binding(2) var fsUniformDiffuseTexture: texture_2d<f32>;
@group(1) @binding(3) var fsUniformNormalSampler: sampler;
@group(1) @binding(4) var fsUniformNormalTexture: texture_2d<f32>;
@group(1) @binding(5) var fsUniformOrmSampler: sampler;
@group(1) @binding(6) var fsUniformOrmTexture: texture_2d<f32>;
@group(1) @binding(7) var fsUniformShadowSampler: sampler_comparison;
// @group(1) @binding(7) var fsUniformShadowSampler: sampler;
@group(1) @binding(8) var fsUniformShadowTexture: texture_depth_2d;

struct VSIn {
    @location(0) vertexPosition: vec3f,
    @location(1) normal: vec3f,
    @location(2) textureCoord: vec2f,
    @location(3) tangent: vec4f,
    @location(4) skin: vec4<u32>,
    @location(5) boneWeight: vec4f,
}

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) textureCoord: vec2f,
    @location(1) depth: f32,
}

@vertex fn vs(
    in: VSIn
) -> VSOut {
    var position: vec4f = vec4f(in.vertexPosition, 1.0);
    var sum: mat4x4f;

    sum += vsUniforms.nodesMatrices[in.skin[0]] * in.boneWeight[0];
    sum += vsUniforms.nodesMatrices[in.skin[1]] * in.boneWeight[1];
    sum += vsUniforms.nodesMatrices[in.skin[2]] * in.boneWeight[2];
    sum += vsUniforms.nodesMatrices[in.skin[3]] * in.boneWeight[3];

    position = sum * position;
    position.w = 1;

    var out: VSOut;
    out.position = vsUniforms.pMatrix * vsUniforms.mvMatrix * position;
    out.textureCoord = in.textureCoord;

    out.depth = out.position.z / out.position.w;

    return out;
}

struct FSOut {
    @builtin(frag_depth) depth: f32,
    @location(0) color: vec4f
}

@fragment fn fs(
    in: VSOut,
    @builtin(front_facing) isFront: bool
) -> FSOut {
    let texCoord: vec2f = (fsUniforms.tVertexAnim * vec3f(in.textureCoord.x, in.textureCoord.y, 1.)).xy;
    var baseColor: vec4f = textureSample(fsUniformDiffuseTexture, fsUniformDiffuseSampler, texCoord);

    // hand-made alpha-test
    if (baseColor.a < fsUniforms.discardAlphaLevel) {
        discard;
    }

    var out: FSOut;
    out.color = vec4f(1, 1, 1, 1);
    out.depth = in.depth;
    return out;
}
`,Nn=`struct VSUniforms {
    mvMatrix: mat4x4f,
    pMatrix: mat4x4f,
}

@group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;

struct VSIn {
    @location(0) vertexPosition: vec3f,
    @location(1) color: vec3f,
}

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) color: vec3f,
}

@vertex fn vs(
    in: VSIn
) -> VSOut {
    var position: vec4f = vec4f(in.vertexPosition, 1.0);

    var out: VSOut;
    out.position = vsUniforms.pMatrix * vsUniforms.mvMatrix * position;
    out.color = in.color;
    return out;
}

@fragment fn fs(
    in: VSOut
) -> @location(0) vec4f {
    return vec4f(in.color, 1);
}
`,On=`struct VSUniforms {
    mvMatrix: mat4x4f,
    pMatrix: mat4x4f,
}

@group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;
@group(1) @binding(0) var fsUniformSampler: sampler;
@group(1) @binding(1) var fsUniformTexture: texture_cube<f32>;

struct VSIn {
    @location(0) vertexPosition: vec3f,
}

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) localPos: vec3f,
}

@vertex fn vs(
    in: VSIn
) -> VSOut {
    let rotView: mat4x4f = mat4x4f(
        vec4f(vsUniforms.mvMatrix[0].xyz, 0),
        vec4f(vsUniforms.mvMatrix[1].xyz, 0),
        vec4f(vsUniforms.mvMatrix[2].xyz, 0),
        vec4f(0, 0, 0, 1)
    );

    let clipPos: vec4f = vsUniforms.pMatrix * rotView * 1000. * vec4f(in.vertexPosition, 1.0);

    var out: VSOut;
    out.position = clipPos;
    out.localPos = in.vertexPosition;
    return out;
}

@fragment fn fs(
    in: VSOut
) -> @location(0) vec4f {
    return textureSample(fsUniformTexture, fsUniformSampler, in.localPos);
}
`,kn=`const invAtan: vec2f = vec2f(0.1591, 0.3183);

struct VSUniforms {
    mvMatrix: mat4x4f,
    pMatrix: mat4x4f,
}

@group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;
@group(1) @binding(0) var fsUniformSampler: sampler;
@group(1) @binding(1) var fsUniformTexture: texture_2d<f32>;

struct VSIn {
    @location(0) vertexPosition: vec3f,
}

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) localPos: vec3f,
}

@vertex fn vs(
    in: VSIn
) -> VSOut {
    var out: VSOut;
    out.position = vsUniforms.pMatrix * vsUniforms.mvMatrix * vec4f(in.vertexPosition, 1);
    out.localPos = in.vertexPosition;
    return out;
}

fn SampleSphericalMap(v: vec3f) -> vec2f {
    // vec2 uv = vec2(atan(v.z, v.x), asin(v.y));
    var uv: vec2f = vec2f(atan2(v.x, v.y), asin(-v.z));
    uv *= invAtan;
    uv += 0.5;
    return uv;
}

@fragment fn fs(
    in: VSOut
) -> @location(0) vec4f {
    let uv: vec2f = SampleSphericalMap(normalize(in.localPos)); // make sure to normalize localPos
    let color: vec3f = textureSample(fsUniformTexture, fsUniformSampler, uv).rgb;

    return vec4f(color, 1.0);
}
`,Xn=`const PI: f32 = 3.14159265359;
const gamma: f32 = 2.2;
const sampleDelta: f32 = 0.025;

struct VSUniforms {
    mvMatrix: mat4x4f,
    pMatrix: mat4x4f,
}

@group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;
@group(1) @binding(0) var fsUniformSampler: sampler;
@group(1) @binding(1) var fsUniformTexture: texture_cube<f32>;

struct VSIn {
    @location(0) vertexPosition: vec3f,
}

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) localPos: vec3f,
}

@vertex fn vs(
    in: VSIn
) -> VSOut {
    var out: VSOut;
    out.position = vsUniforms.pMatrix * vsUniforms.mvMatrix * vec4f(in.vertexPosition, 1);
    out.localPos = in.vertexPosition;
    return out;
}

@fragment fn fs(
    in: VSOut
) -> @location(0) vec4f {
    var irradiance: vec3f = vec3f(0);

    // the sample direction equals the hemisphere's orientation
    let normal: vec3f = normalize(in.localPos);

    var up: vec3f = vec3f(0.0, 1.0, 0.0);
    let right: vec3f = normalize(cross(up, normal));
    up = normalize(cross(normal, right));

    var nrSamples: i32 = 0;
    for (var phi: f32 = 0.0; phi < 2.0 * PI; phi += sampleDelta)
    {
        for (var theta: f32 = 0.0; theta < 0.5 * PI; theta += sampleDelta)
        {
            // spherical to cartesian (in tangent space)
            let tangentSample: vec3f = vec3f(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta));
            // tangent space to world
            let sampleVec: vec3f = tangentSample.x * right + tangentSample.y * up + tangentSample.z * normal;

            irradiance += pow(textureSample(fsUniformTexture, fsUniformSampler, sampleVec).rgb, vec3f(gamma)) * cos(theta) * sin(theta);
            nrSamples++;
        }
    }
    irradiance = PI * irradiance * (1.0 / f32(nrSamples));

    return vec4f(irradiance, 1.0);
}
`,Hn=`const PI: f32 = 3.14159265359;
const gamma: f32 = 2.2;

struct VSUniforms {
    mvMatrix: mat4x4f,
    pMatrix: mat4x4f,
}

struct FSUniforms {
    roughness: f32,
}

@group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;
@group(1) @binding(0) var<uniform> fsUniforms: FSUniforms;
@group(1) @binding(1) var fsUniformSampler: sampler;
@group(1) @binding(2) var fsUniformTexture: texture_cube<f32>;

struct VSIn {
    @location(0) vertexPosition: vec3f,
}

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) localPos: vec3f,
}

@vertex fn vs(
    in: VSIn
) -> VSOut {
    var out: VSOut;
    out.position = vsUniforms.pMatrix * vsUniforms.mvMatrix * vec4f(in.vertexPosition, 1);
    out.localPos = in.vertexPosition;
    return out;
}

fn RadicalInverse_VdC(bits: u32) -> f32 {
    var res: u32 = bits;
    res = (res << 16u) | (res >> 16u);
    res = ((res & 0x55555555u) << 1u) | ((res & 0xAAAAAAAAu) >> 1u);
    res = ((res & 0x33333333u) << 2u) | ((res & 0xCCCCCCCCu) >> 2u);
    res = ((res & 0x0F0F0F0Fu) << 4u) | ((res & 0xF0F0F0F0u) >> 4u);
    res = ((res & 0x00FF00FFu) << 8u) | ((res & 0xFF00FF00u) >> 8u);
    return f32(res) * 2.3283064365386963e-10; // / 0x100000000
}

fn Hammersley(i: u32, N: u32) -> vec2f {
    return vec2f(f32(i)/f32(N), RadicalInverse_VdC(i));
}

fn ImportanceSampleGGX(Xi: vec2f, N: vec3f, roughness: f32) -> vec3f {
    let a: f32 = roughness * roughness;

    let phi: f32 = 2.0 * PI * Xi.x;
    let cosTheta: f32 = sqrt((1.0 - Xi.y) / (1.0 + (a*a - 1.0) * Xi.y));
    let sinTheta: f32 = sqrt(1.0 - cosTheta*cosTheta);

    // from spherical coordinates to cartesian coordinates
    var H: vec3f;
    H.x = cos(phi) * sinTheta;
    H.y = sin(phi) * sinTheta;
    H.z = cosTheta;

    // from tangent-space vector to world-space sample vector
    var up: vec3f;
    if (abs(N.z) < 0.999) {
        up = vec3f(0.0, 0.0, 1.0);
    } else {
        up = vec3f(1.0, 0.0, 0.0);
    }
    let tangent: vec3f   = normalize(cross(up, N));
    let bitangent: vec3f = cross(N, tangent);

    let sampleVec: vec3f = tangent * H.x + bitangent * H.y + N * H.z;

    return normalize(sampleVec);
}

@fragment fn fs(
    in: VSOut
) -> @location(0) vec4f {
    let N: vec3f = normalize(in.localPos);
    let R: vec3f = N;
    let V: vec3f = R;

    const SAMPLE_COUNT: u32 = 1024u;
    var totalWeight: f32 = 0.0;
    var prefilteredColor: vec3f = vec3f(0.0);
    for(var i: u32 = 0u; i < SAMPLE_COUNT; i++)
    {
        let Xi: vec2f = Hammersley(i, SAMPLE_COUNT);
        let H: vec3f  = ImportanceSampleGGX(Xi, N, fsUniforms.roughness);
        let L: vec3f  = normalize(2.0 * dot(V, H) * H - V);

        let NdotL: f32 = max(dot(N, L), 0.0);
        if(NdotL > 0.0) {
            prefilteredColor += pow(textureSampleLevel(fsUniformTexture, fsUniformSampler, L, 0).rgb, vec3f(gamma)) * NdotL;
            totalWeight      += NdotL;
        }
    }
    prefilteredColor = prefilteredColor / totalWeight;

    return vec4f(prefilteredColor, 1.0);
}
`,zn=`const PI: f32 = 3.14159265359;

struct VSIn {
    @location(0) vertexPosition: vec3f,
}

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) localPos: vec3f,
}

@vertex fn vs(
    in: VSIn
) -> VSOut {
    var out: VSOut;
    out.position = vec4f(in.vertexPosition, 1);
    out.localPos = in.vertexPosition;
    return out;
}

fn RadicalInverse_VdC(bits: u32) -> f32 {
    var res: u32 = bits;
    res = (res << 16u) | (res >> 16u);
    res = ((res & 0x55555555u) << 1u) | ((res & 0xAAAAAAAAu) >> 1u);
    res = ((res & 0x33333333u) << 2u) | ((res & 0xCCCCCCCCu) >> 2u);
    res = ((res & 0x0F0F0F0Fu) << 4u) | ((res & 0xF0F0F0F0u) >> 4u);
    res = ((res & 0x00FF00FFu) << 8u) | ((res & 0xFF00FF00u) >> 8u);
    return f32(res) * 2.3283064365386963e-10; // / 0x100000000
}

fn Hammersley(i: u32, N: u32) -> vec2f {
    return vec2f(f32(i)/f32(N), RadicalInverse_VdC(i));
}

fn ImportanceSampleGGX(Xi: vec2f, N: vec3f, roughness: f32) -> vec3f {
    let a: f32 = roughness * roughness;

    let phi: f32 = 2.0 * PI * Xi.x;
    let cosTheta: f32 = sqrt((1.0 - Xi.y) / (1.0 + (a*a - 1.0) * Xi.y));
    let sinTheta: f32 = sqrt(1.0 - cosTheta*cosTheta);

    // from spherical coordinates to cartesian coordinates
    var H: vec3f;
    H.x = cos(phi) * sinTheta;
    H.y = sin(phi) * sinTheta;
    H.z = cosTheta;

    // from tangent-space vector to world-space sample vector
    var up: vec3f;
    if (abs(N.z) < 0.999) {
        up = vec3f(0.0, 0.0, 1.0);
    } else {
        up = vec3f(1.0, 0.0, 0.0);
    }
    let tangent: vec3f   = normalize(cross(up, N));
    let bitangent: vec3f = cross(N, tangent);

    let sampleVec: vec3f = tangent * H.x + bitangent * H.y + N * H.z;

    return normalize(sampleVec);
}

fn geometrySchlickGGX(nDotV: f32, roughness: f32) -> f32 {
    let r: f32 = roughness + 1.;
    let k: f32 = r * r / 8.;
    // float k = roughness * roughness / 2.;

    let num: f32 = nDotV;
    let denom: f32 = nDotV * (1. - k) + k;

    return num / denom;
}

fn geometrySmith(normal: vec3f, viewDir: vec3f, lightDir: vec3f, roughness: f32) -> f32 {
    let nDotV: f32 = max(dot(normal, viewDir), .0);
    let nDotL: f32 = max(dot(normal, lightDir), .0);
    let ggx2: f32  = geometrySchlickGGX(nDotV, roughness);
    let ggx1: f32  = geometrySchlickGGX(nDotL, roughness);

    return ggx1 * ggx2;
}

fn IntegrateBRDF(NdotV: f32, roughness: f32) -> vec2f {
    var V: vec3f;
    V.x = sqrt(1.0 - NdotV*NdotV);
    V.y = 0.0;
    V.z = NdotV;

    var A: f32 = 0.0;
    var B: f32 = 0.0;

    let N: vec3f = vec3f(0.0, 0.0, 1.0);

    const SAMPLE_COUNT: u32 = 1024u;
    for(var i: u32 = 0u; i < SAMPLE_COUNT; i++) {
        let Xi: vec2f = Hammersley(i, SAMPLE_COUNT);
        let H: vec3f  = ImportanceSampleGGX(Xi, N, roughness);
        let L: vec3f  = normalize(2.0 * dot(V, H) * H - V);

        let NdotL: f32 = max(L.z, 0.0);
        let NdotH: f32 = max(H.z, 0.0);
        let VdotH: f32 = max(dot(V, H), 0.0);

        if (NdotL > 0.0) {
            let G: f32 = geometrySmith(N, V, L, roughness);
            let G_Vis: f32 = (G * VdotH) / (NdotH * NdotV);
            let Fc: f32 = pow(1.0 - VdotH, 5.0);

            A += (1.0 - Fc) * G_Vis;
            B += Fc * G_Vis;
        }
    }
    A /= f32(SAMPLE_COUNT);
    B /= f32(SAMPLE_COUNT);

    return vec2f(A, B);
}

@fragment fn fs(
    in: VSOut
) -> @location(0) vec4f {
    return vec4f(IntegrateBRDF((in.localPos.x + 1.0) * .5, (in.localPos.y + 1.0) * .5), 0., 1.);
}
`,Wn=`struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) texCoord: vec2f,
};

@vertex fn vs(
    @location(0) position: vec2f
) -> VSOut {
    var vsOutput: VSOut;
    vsOutput.position = vec4f(position * 2.0 - 1.0, 0.0, 1.0);
    vsOutput.texCoord = vec2f(position.x, 1.0 - position.y);
    return vsOutput;
}

@group(0) @binding(0) var textureSampler: sampler;
@group(0) @binding(1) var textureView: texture_2d<f32>;

@fragment fn fs(
    fsInput: VSOut
) -> @location(0) vec4f {
    return textureSample(textureView, textureSampler, fsInput.texCoord);
}`;let lr,Rt,Qe;const wt=new WeakMap;function fr(t,e){Qe||(Qe=t.createBuffer({label:"mips vertex buffer",size:48,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(Qe.getMappedRange(0,Qe.size)).set([0,0,1,0,0,1,0,1,1,0,1,1]),Qe.unmap(),Rt=t.createShaderModule({label:"mips shader module",code:Wn}),lr=t.createSampler({label:"mips sampler",minFilter:"linear"})),wt[e.format]||(wt[e.format]=t.createRenderPipeline({label:"mips pipeline",layout:"auto",vertex:{module:Rt,buffers:[{arrayStride:8,attributes:[{shaderLocation:0,offset:0,format:"float32x2"}]}]},fragment:{module:Rt,targets:[{format:e.format}]}}));const i=wt[e.format],r=t.createCommandEncoder({label:"mips encoder"});for(let o=1;o<e.mipLevelCount;++o)for(let s=0;s<e.depthOrArrayLayers;++s){const a=t.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:lr},{binding:1,resource:e.createView({dimension:"2d",baseMipLevel:o-1,mipLevelCount:1,baseArrayLayer:s,arrayLayerCount:1})}]}),f={label:"mips render pass",colorAttachments:[{view:e.createView({dimension:"2d",baseMipLevel:o,mipLevelCount:1,baseArrayLayer:s,arrayLayerCount:1}),loadOp:"clear",storeOp:"store"}]},l=r.beginRenderPass(f);l.setPipeline(i),l.setVertexBuffer(0,Qe),l.setBindGroup(0,a),l.draw(6),l.end()}const n=r.finish();t.queue.submit([n])}const J=254,Je=2048,et=32,Ye=128,De=8,tt=512,pt=4,qn=new Set([0,1]),Yn=vn.replace(/\$\{MAX_NODES}/g,String(J)),Kn=Tn.replace(/\$\{MAX_NODES}/g,String(J)),$n=Pn.replace(/\$\{MAX_NODES}/g,String(J)),jn=En.replace(/\$\{MAX_ENV_MIP_LEVELS}/g,String(De.toFixed(1))),Zn=_n.replace(/\$\{MAX_NODES}/g,String(J)),Qn=Gn.replace(/\$\{MAX_NODES}/g,String(J)).replace(/\$\{MAX_ENV_MIP_LEVELS}/g,String(De.toFixed(1))),Jn=In.replace(/\$\{MAX_NODES}/g,String(J)),_t=d.create(),Gt=ue.create(),It=d.create(),Nt=d.fromValues(0,0,0),Ot=ue.fromValues(0,0,0,1),kt=d.fromValues(1,1,1),vt=ue.create(),hr=H.create(),ur=H.create(),Ke=d.create(),Be=d.create(),cr=ue.create(),dr=H.create(),Ge=d.create(),xt=d.create(),gr=d.create(),bt=d.create(),de=d.create(),Tt=d.create(),eo=d.create(),mr=Ut.create(),ge=H.create(),Pt=Ut.create(),to=[["none",{color:{operation:"add",srcFactor:"one",dstFactor:"zero"},alpha:{operation:"add",srcFactor:"one",dstFactor:"zero"}},{depthWriteEnabled:!0,depthCompare:"less-equal",format:"depth24plus"}],["transparent",{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one-minus-src-alpha"}},{depthWriteEnabled:!0,depthCompare:"less-equal",format:"depth24plus"}],["blend",{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one-minus-src-alpha"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}],["additive",{color:{operation:"add",srcFactor:"src",dstFactor:"one"},alpha:{operation:"add",srcFactor:"src",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}],["addAlpha",{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one"},alpha:{operation:"add",srcFactor:"src-alpha",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}],["modulate",{color:{operation:"add",srcFactor:"zero",dstFactor:"src"},alpha:{operation:"add",srcFactor:"zero",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}],["modulate2x",{color:{operation:"add",srcFactor:"dst",dstFactor:"src"},alpha:{operation:"add",srcFactor:"zero",dstFactor:"one"}},{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"}]];class ro{constructor(e){var i;this.gpuPipelines={},this.particlesEnabled=!0,this.ribbonsEnabled=!0,this.vertexBuffer=[],this.normalBuffer=[],this.vertices=[],this.texCoordBuffer=[],this.indexBuffer=[],this.wireframeIndexBuffer=[],this.wireframeIndexGPUBuffer=[],this.groupBuffer=[],this.skinWeightBuffer=[],this.tangentBuffer=[],this.gpuVertexBuffer=[],this.gpuNormalBuffer=[],this.gpuTexCoordBuffer=[],this.gpuGroupBuffer=[],this.gpuIndexBuffer=[],this.gpuSkinWeightBuffer=[],this.gpuTangentBuffer=[],this.gpuFSUniformsBuffers=[],this.isHD=(i=e.Geosets)==null?void 0:i.some(r=>{var n;return((n=r.SkinWeights)==null?void 0:n.length)>0}),this.shaderProgramLocations={vertexPositionAttribute:null,normalsAttribute:null,textureCoordAttribute:null,groupAttribute:null,skinAttribute:null,weightAttribute:null,tangentAttribute:null,pMatrixUniform:null,mvMatrixUniform:null,samplerUniform:null,normalSamplerUniform:null,ormSamplerUniform:null,replaceableColorUniform:null,replaceableTypeUniform:null,discardAlphaLevelUniform:null,tVertexAnimUniform:null,wireframeUniform:null,nodesMatricesAttributes:null,lightPosUniform:null,lightColorUniform:null,cameraPosUniform:null,shadowParamsUniform:null,shadowMapSamplerUniform:null,shadowMapLightMatrixUniform:null,hasEnvUniform:null,irradianceMapUniform:null,prefilteredEnvUniform:null,brdfLUTUniform:null},this.skeletonShaderProgramLocations={vertexPositionAttribute:null,colorAttribute:null,mvMatrixUniform:null,pMatrixUniform:null},this.model=e,this.rendererData={model:e,frame:0,animation:null,animationInfo:null,globalSequencesFrames:[],rootNode:null,nodes:[],geosetAnims:[],geosetAlpha:[],materialLayerTextureID:[],materialLayerNormalTextureID:[],materialLayerOrmTextureID:[],materialLayerReflectionTextureID:[],teamColor:null,cameraPos:null,cameraQuat:null,lightPos:null,lightColor:null,shadowBias:0,shadowSmoothingStep:0,textures:{},gpuTextures:{},gpuSamplers:[],gpuDepthSampler:null,gpuEmptyTexture:null,gpuEmptyCubeTexture:null,gpuDepthEmptyTexture:null,envTextures:{},gpuEnvTextures:{},requiredEnvMaps:{},irradianceMap:{},gpuIrradianceMap:{},prefilteredEnvMap:{},gpuPrefilteredEnvMap:{}},this.rendererData.teamColor=d.fromValues(1,0,0),this.rendererData.cameraPos=d.create(),this.rendererData.cameraQuat=ue.create(),this.rendererData.lightPos=d.fromValues(1e3,1e3,1e3),this.rendererData.lightColor=d.fromValues(1,1,1),this.setSequence(0),this.rendererData.rootNode={node:{},matrix:H.create(),childs:[]};for(const r of e.Nodes)r&&(this.rendererData.nodes[r.ObjectId]={node:r,matrix:H.create(),childs:[]});for(const r of e.Nodes)r&&(!r.Parent&&r.Parent!==0?this.rendererData.rootNode.childs.push(this.rendererData.nodes[r.ObjectId]):this.rendererData.nodes[r.Parent].childs.push(this.rendererData.nodes[r.ObjectId]));if(e.GlobalSequences)for(let r=0;r<e.GlobalSequences.length;++r)this.rendererData.globalSequencesFrames[r]=0;for(let r=0;r<e.GeosetAnims.length;++r)this.rendererData.geosetAnims[e.GeosetAnims[r].GeosetId]=e.GeosetAnims[r];for(let r=0;r<e.Materials.length;++r)this.rendererData.materialLayerTextureID[r]=new Array(e.Materials[r].Layers.length),this.rendererData.materialLayerNormalTextureID[r]=new Array(e.Materials[r].Layers.length),this.rendererData.materialLayerOrmTextureID[r]=new Array(e.Materials[r].Layers.length),this.rendererData.materialLayerReflectionTextureID[r]=new Array(e.Materials[r].Layers.length);this.interp=new qt(this.rendererData),this.particlesController=new cn(this.interp,this.rendererData),this.ribbonsController=new pn(this.interp,this.rendererData)}setParticlesEnabled(e){this.particlesEnabled=e}setRibbonsEnabled(e){this.ribbonsEnabled=e}setEffectsEnabled(e){typeof e.particles=="boolean"&&(this.particlesEnabled=e.particles),typeof e.ribbons=="boolean"&&(this.ribbonsEnabled=e.ribbons)}destroy(){var e,i,r;if(this.particlesController&&(this.particlesController.destroy(),this.particlesController=null),this.ribbonsController&&(this.ribbonsController.destroy(),this.ribbonsController=null),this.device){for(const n of this.wireframeIndexGPUBuffer)n.destroy();(e=this.gpuMultisampleTexture)==null||e.destroy(),(i=this.gpuDepthTexture)==null||i.destroy();for(const n of this.gpuVertexBuffer)n.destroy();for(const n of this.gpuNormalBuffer)n.destroy();for(const n of this.gpuTexCoordBuffer)n.destroy();for(const n of this.gpuGroupBuffer)n.destroy();for(const n of this.gpuIndexBuffer)n.destroy();for(const n of this.gpuSkinWeightBuffer)n.destroy();for(const n of this.gpuTangentBuffer)n.destroy();(r=this.gpuVSUniformsBuffer)==null||r.destroy();for(const n in this.gpuFSUniformsBuffers)for(const o of this.gpuFSUniformsBuffers[n])o.destroy();this.skeletonGPUVertexBuffer&&(this.skeletonGPUVertexBuffer.destroy(),this.skeletonGPUVertexBuffer=null),this.skeletonGPUColorBuffer&&(this.skeletonGPUColorBuffer.destroy(),this.skeletonGPUColorBuffer=null),this.skeletonGPUUniformsBuffer&&(this.skeletonGPUUniformsBuffer.destroy(),this.skeletonGPUUniformsBuffer=null),this.envVSUniformsBuffer&&(this.envVSUniformsBuffer.destroy(),this.envVSUniformsBuffer=null),this.cubeGPUVertexBuffer&&(this.cubeGPUVertexBuffer.destroy(),this.cubeGPUVertexBuffer=null);for(const n of this.wireframeIndexGPUBuffer)n==null||n.destroy()}this.gl&&(this.skeletonShaderProgram&&(this.skeletonVertexShader&&(this.gl.detachShader(this.skeletonShaderProgram,this.skeletonVertexShader),this.gl.deleteShader(this.skeletonVertexShader),this.skeletonVertexShader=null),this.skeletonFragmentShader&&(this.gl.detachShader(this.skeletonShaderProgram,this.skeletonFragmentShader),this.gl.deleteShader(this.skeletonFragmentShader),this.skeletonFragmentShader=null),this.gl.deleteProgram(this.skeletonShaderProgram),this.skeletonShaderProgram=null),this.shaderProgram&&(this.vertexShader&&(this.gl.detachShader(this.shaderProgram,this.vertexShader),this.gl.deleteShader(this.vertexShader),this.vertexShader=null),this.fragmentShader&&(this.gl.detachShader(this.shaderProgram,this.fragmentShader),this.gl.deleteShader(this.fragmentShader),this.fragmentShader=null),this.gl.deleteProgram(this.shaderProgram),this.shaderProgram=null),this.destroyShaderProgramObject(this.envToCubemap),this.destroyShaderProgramObject(this.envSphere),this.destroyShaderProgramObject(this.convoluteDiffuseEnv),this.destroyShaderProgramObject(this.prefilterEnv),this.destroyShaderProgramObject(this.integrateBRDF),this.gl.deleteBuffer(this.cubeVertexBuffer),this.gl.deleteBuffer(this.squareVertexBuffer))}initRequiredEnvMaps(){this.model.Version>=1e3&&(Pe(this.gl)||this.device)&&this.model.Materials.forEach(e=>{let i;if(e.Shader==="Shader_HD_DefaultUnit"&&e.Layers.length===6&&typeof e.Layers[5].TextureID=="number"||this.model.Version>=1100&&(i=e.Layers.find(r=>r.ShaderTypeId===1&&r.ReflectionsTextureID))&&typeof i.ReflectionsTextureID=="number"){const r=this.model.Version>=1100&&i?i.ReflectionsTextureID:e.Layers[5].TextureID;this.rendererData.requiredEnvMaps[this.model.Textures[r].Image]=!0}})}initGL(e){this.gl=e,this.softwareSkinning=this.gl.getParameter(this.gl.MAX_VERTEX_UNIFORM_VECTORS)<4*(J+2),this.anisotropicExt=this.gl.getExtension("EXT_texture_filter_anisotropic")||this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic")||this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic"),this.colorBufferFloatExt=this.gl.getExtension("EXT_color_buffer_float"),this.initRequiredEnvMaps(),this.initShaders(),this.initBuffers(),this.initCube(),this.initSquare(),this.initBRDFLUT(),this.particlesController.initGL(e),this.ribbonsController.initGL(e)}async initGPUDevice(e,i,r){this.canvas=e,this.device=i,this.gpuContext=r,this.initRequiredEnvMaps(),this.initGPUShaders(),this.initGPUPipeline(),this.initGPUBuffers(),this.initGPUUniformBuffers(),this.initGPUMultisampleTexture(),this.initGPUDepthTexture(),this.initGPUEmptyTexture(),this.initCube(),this.initGPUBRDFLUT(),this.particlesController.initGPUDevice(i),this.ribbonsController.initGPUDevice(i)}setTextureImage(e,i){var r;if(this.device){const n=this.rendererData.gpuTextures[e]=this.device.createTexture({size:[i.width,i.height],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});this.device.queue.copyExternalImageToTexture({source:i},{texture:n},{width:i.width,height:i.height}),fr(this.device,n),this.processEnvMaps(e)}else{this.rendererData.textures[e]=this.gl.createTexture(),this.gl.bindTexture(this.gl.TEXTURE_2D,this.rendererData.textures[e]),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i);const n=((r=this.model.Textures.find(o=>o.Image===e))==null?void 0:r.Flags)||0;this.setTextureParameters(n,!0),this.gl.generateMipmap(this.gl.TEXTURE_2D),this.processEnvMaps(e),this.gl.bindTexture(this.gl.TEXTURE_2D,null)}}setTextureImageData(e,i){var n;let r=1;for(let o=1;o<i.length&&!(i[o].width!==i[o-1].width/2||i[o].height!==i[o-1].height/2);++o,++r);if(this.device){const o=this.rendererData.gpuTextures[e]=this.device.createTexture({size:[i[0].width,i[0].height],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,mipLevelCount:r});for(let s=0;s<r;++s)this.device.queue.writeTexture({texture:o,mipLevel:s},i[s].data,{bytesPerRow:i[s].width*4},{width:i[s].width,height:i[s].height});this.processEnvMaps(e)}else{this.rendererData.textures[e]=this.gl.createTexture(),this.gl.bindTexture(this.gl.TEXTURE_2D,this.rendererData.textures[e]);for(let s=0;s<r;++s)this.gl.texImage2D(this.gl.TEXTURE_2D,s,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i[s]);const o=((n=this.model.Textures.find(s=>s.Image===e))==null?void 0:n.Flags)||0;this.setTextureParameters(o,!1),this.processEnvMaps(e),this.gl.bindTexture(this.gl.TEXTURE_2D,null)}}setTextureCompressedImage(e,i,r,n){var f;this.rendererData.textures[e]=this.gl.createTexture(),this.gl.bindTexture(this.gl.TEXTURE_2D,this.rendererData.textures[e]);const o=new Uint8Array(r);let s=1;for(let l=1;l<n.images.length;++l){const u=n.images[l];u.shape.width>=2&&u.shape.height>=2&&(s=l+1)}if(Pe(this.gl)){this.gl.texStorage2D(this.gl.TEXTURE_2D,s,i,n.images[0].shape.width,n.images[0].shape.height);for(let l=0;l<s;++l){const u=n.images[l];this.gl.compressedTexSubImage2D(this.gl.TEXTURE_2D,l,0,0,u.shape.width,u.shape.height,i,o.subarray(u.offset,u.offset+u.length))}}else for(let l=0;l<s;++l){const u=n.images[l];this.gl.compressedTexImage2D(this.gl.TEXTURE_2D,l,i,u.shape.width,u.shape.height,0,o.subarray(u.offset,u.offset+u.length))}const a=((f=this.model.Textures.find(l=>l.Image===e))==null?void 0:f.Flags)||0;this.setTextureParameters(a,Pe(this.gl)),this.processEnvMaps(e),this.gl.bindTexture(this.gl.TEXTURE_2D,null)}setGPUTextureCompressedImage(e,i,r,n){const o=new Uint8Array(r);let s=1;for(let f=1;f<n.images.length;++f){const l=n.images[f];l.shape.width>=4&&l.shape.height>=4&&(s=f+1)}const a=this.rendererData.gpuTextures[e]=this.device.createTexture({size:[n.shape.width,n.shape.height],format:i,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,mipLevelCount:s});for(let f=0;f<s;++f){const l=n.images[f];this.device.queue.writeTexture({texture:a,mipLevel:f},o.subarray(l.offset,l.offset+l.length),{bytesPerRow:l.shape.width*(i==="bc1-rgba-unorm"?2:4)},{width:l.shape.width,height:l.shape.height})}this.processEnvMaps(e)}setCamera(e,i){d.copy(this.rendererData.cameraPos,e),ue.copy(this.rendererData.cameraQuat,i)}setLightPosition(e){d.copy(this.rendererData.lightPos,e)}setLightColor(e){d.copy(this.rendererData.lightColor,e)}setSequence(e){this.rendererData.animation=e,this.rendererData.animationInfo=this.model.Sequences[this.rendererData.animation],this.rendererData.frame=this.rendererData.animationInfo.Interval[0]}getSequence(){return this.rendererData.animation}setFrame(e){const i=this.model.Sequences.findIndex(r=>r.Interval[0]<=e&&r.Interval[1]>=e);i<0||(this.rendererData.animation=i,this.rendererData.animationInfo=this.model.Sequences[this.rendererData.animation],this.rendererData.frame=e)}getFrame(){return this.rendererData.frame}setTeamColor(e){d.copy(this.rendererData.teamColor,e)}update(e){this.rendererData.frame+=e,this.rendererData.frame>this.rendererData.animationInfo.Interval[1]&&(this.rendererData.frame=this.rendererData.animationInfo.Interval[0]),this.updateGlobalSequences(e),this.updateNode(this.rendererData.rootNode),this.particlesEnabled&&this.particlesController.update(e),this.ribbonsEnabled&&this.ribbonsController.update(e);for(let i=0;i<this.model.Geosets.length;++i)this.rendererData.geosetAlpha[i]=this.findAlpha(i);for(let i=0;i<this.rendererData.materialLayerTextureID.length;++i)for(let r=0;r<this.rendererData.materialLayerTextureID[i].length;++r){const n=this.model.Materials[i].Layers[r],o=n.TextureID,s=n.NormalTextureID,a=n.ORMTextureID,f=n.ReflectionsTextureID;typeof o=="number"?this.rendererData.materialLayerTextureID[i][r]=o:this.rendererData.materialLayerTextureID[i][r]=this.interp.num(o),typeof s<"u"&&(this.rendererData.materialLayerNormalTextureID[i][r]=typeof s=="number"?s:this.interp.num(s)),typeof a<"u"&&(this.rendererData.materialLayerOrmTextureID[i][r]=typeof a=="number"?a:this.interp.num(a)),typeof f<"u"&&(this.rendererData.materialLayerReflectionTextureID[i][r]=typeof f=="number"?f:this.interp.num(f))}}render(e,i,{wireframe:r,env:n,levelOfDetail:o=0,useEnvironmentMap:s=!1,shadowMapTexture:a,shadowMapMatrix:f,shadowBias:l,shadowSmoothingStep:u,depthTextureTarget:g}){var S,m,T,b,w;if(!(g&&!this.isHD)){if(this.device){(this.gpuMultisampleTexture.width!==this.canvas.width||this.gpuMultisampleTexture.height!==this.canvas.height)&&(this.gpuMultisampleTexture.destroy(),this.initGPUMultisampleTexture()),(this.gpuDepthTexture.width!==this.canvas.width||this.gpuDepthTexture.height!==this.canvas.height)&&(this.gpuDepthTexture.destroy(),this.initGPUDepthTexture());let c;g?c={label:"shadow renderPass",colorAttachments:[],depthStencilAttachment:{view:g.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}}:(c=this.gpuRenderPassDescriptor,this.gpuRenderPassDescriptor.colorAttachments[0].view=this.gpuMultisampleTexture.createView(),this.gpuRenderPassDescriptor.colorAttachments[0].resolveTarget=this.gpuContext.getCurrentTexture().createView(),this.gpuRenderPassDescriptor.depthStencilAttachment={view:this.gpuDepthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"});const v=this.device.createCommandEncoder(),h=v.beginRenderPass(c);n&&this.renderEnvironmentGPU(h,e,i);const B=new ArrayBuffer(128+64*J),C={mvMatrix:new Float32Array(B,0,16),pMatrix:new Float32Array(B,64,16),nodesMatrices:new Float32Array(B,128,16*J)};C.mvMatrix.set(e),C.pMatrix.set(i);for(let E=0;E<J;++E)this.rendererData.nodes[E]&&C.nodesMatrices.set(this.rendererData.nodes[E].matrix,E*16);this.device.queue.writeBuffer(this.gpuVSUniformsBuffer,0,B);for(let E=0;E<this.model.Geosets.length;++E){const U=this.model.Geosets[E];if(this.rendererData.geosetAlpha[E]<1e-6||U.LevelOfDetail!==void 0&&U.LevelOfDetail!==o)continue;r&&!this.wireframeIndexGPUBuffer[E]&&this.createWireframeGPUBuffer(E);const p=U.MaterialID,I=this.model.Materials[p];if(h.setVertexBuffer(0,this.gpuVertexBuffer[E]),h.setVertexBuffer(1,this.gpuNormalBuffer[E]),h.setVertexBuffer(2,this.gpuTexCoordBuffer[E]),this.isHD?(h.setVertexBuffer(3,this.gpuTangentBuffer[E]),h.setVertexBuffer(4,this.gpuSkinWeightBuffer[E]),h.setVertexBuffer(5,this.gpuSkinWeightBuffer[E])):h.setVertexBuffer(3,this.gpuGroupBuffer[E]),h.setIndexBuffer(r?this.wireframeIndexGPUBuffer[E]:this.gpuIndexBuffer[E],"uint16"),this.isHD){const F=I.Layers[0];if(g&&!qn.has(F.FilterMode||0))continue;const G=g?this.gpuShadowPipeline:r?this.gpuWireframePipeline:this.getGPUPipeline(F);h.setPipeline(G);const A=this.rendererData.materialLayerTextureID[p],M=this.rendererData.materialLayerNormalTextureID[p],D=this.rendererData.materialLayerOrmTextureID[p],y=this.rendererData.materialLayerReflectionTextureID[p],Y=A[0],L=this.model.Textures[Y],re=(F==null?void 0:F.ShaderTypeId)===1?M[0]:A[1],be=this.model.Textures[re],me=(F==null?void 0:F.ShaderTypeId)===1?D[0]:A[2],oe=this.model.Textures[me],Te=(F==null?void 0:F.ShaderTypeId)===1?y[0]:A[5],ie=this.model.Textures[Te],pe=ie==null?void 0:ie.Image,Ue=this.rendererData.gpuIrradianceMap[pe],ye=this.rendererData.gpuPrefilteredEnvMap[pe],Ce=n&&Ue&&ye;(S=this.gpuFSUniformsBuffers)[p]||(S[p]=[]);let se=this.gpuFSUniformsBuffers[p][0];se||(se=this.gpuFSUniformsBuffers[p][0]=this.device.createBuffer({label:`fs uniforms ${p}`,size:192,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}));const le=this.getTexCoordMatrix(F),j=new ArrayBuffer(192),Z={replaceableColor:new Float32Array(j,0,3),discardAlphaLevel:new Float32Array(j,12,1),tVertexAnim:new Float32Array(j,16,12),lightPos:new Float32Array(j,64,3),hasEnv:new Uint32Array(j,76,1),lightColor:new Float32Array(j,80,3),wireframe:new Uint32Array(j,92,1),cameraPos:new Float32Array(j,96,3),shadowParams:new Float32Array(j,112,3),shadowMapLightMatrix:new Float32Array(j,128,16)};Z.replaceableColor.set(this.rendererData.teamColor),Z.discardAlphaLevel.set([F.FilterMode===z.Transparent?.75:0]),Z.tVertexAnim.set(le.slice(0,3)),Z.tVertexAnim.set(le.slice(3,6),4),Z.tVertexAnim.set(le.slice(6,9),8),Z.lightPos.set(this.rendererData.lightPos),Z.lightColor.set(this.rendererData.lightColor),Z.cameraPos.set(this.rendererData.cameraPos),a&&f?(Z.shadowParams.set([1,l??1e-6,u??1/1024]),Z.shadowMapLightMatrix.set(f)):(Z.shadowParams.set([0,0,0]),Z.shadowMapLightMatrix.set([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])),Z.hasEnv.set([Ce?1:0]),Z.wireframe.set([r?1:0]),this.device.queue.writeBuffer(se,0,j);const Me=this.device.createBindGroup({label:`fs uniforms ${p}`,layout:this.fsBindGroupLayout,entries:[{binding:0,resource:{buffer:se}},{binding:1,resource:this.rendererData.gpuSamplers[Y]},{binding:2,resource:(this.rendererData.gpuTextures[L.Image]||this.rendererData.gpuEmptyTexture).createView()},{binding:3,resource:this.rendererData.gpuSamplers[re]},{binding:4,resource:(this.rendererData.gpuTextures[be.Image]||this.rendererData.gpuEmptyTexture).createView()},{binding:5,resource:this.rendererData.gpuSamplers[me]},{binding:6,resource:(this.rendererData.gpuTextures[oe.Image]||this.rendererData.gpuEmptyTexture).createView()},{binding:7,resource:this.rendererData.gpuDepthSampler},{binding:8,resource:(a||this.rendererData.gpuDepthEmptyTexture).createView()},{binding:9,resource:this.prefilterEnvSampler},{binding:10,resource:(Ue||this.rendererData.gpuEmptyCubeTexture).createView({dimension:"cube"})},{binding:11,resource:this.prefilterEnvSampler},{binding:12,resource:(ye||this.rendererData.gpuEmptyCubeTexture).createView({dimension:"cube"})},{binding:13,resource:this.gpuBrdfSampler},{binding:14,resource:this.gpuBrdfLUT.createView()}]});h.setBindGroup(0,this.gpuVSUniformsBindGroup),h.setBindGroup(1,Me),h.drawIndexed(r?U.Faces.length*2:U.Faces.length)}else for(let F=0;F<I.Layers.length;++F){const G=I.Layers[F],A=this.rendererData.materialLayerTextureID[p][F],M=this.model.Textures[A],D=r?this.gpuWireframePipeline:this.getGPUPipeline(G);h.setPipeline(D),(m=this.gpuFSUniformsBuffers)[p]||(m[p]=[]);let y=this.gpuFSUniformsBuffers[p][F];y||(y=this.gpuFSUniformsBuffers[p][F]=this.device.createBuffer({label:`fs uniforms ${p} ${F}`,size:80,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}));const Y=this.getTexCoordMatrix(G),L=new ArrayBuffer(80),re={replaceableColor:new Float32Array(L,0,3),replaceableType:new Uint32Array(L,12,1),discardAlphaLevel:new Float32Array(L,16,1),wireframe:new Uint32Array(L,20,1),tVertexAnim:new Float32Array(L,32,12)};re.replaceableColor.set(this.rendererData.teamColor),re.replaceableType.set([M.ReplaceableId||0]),re.discardAlphaLevel.set([G.FilterMode===z.Transparent?.75:0]),re.tVertexAnim.set(Y.slice(0,3)),re.tVertexAnim.set(Y.slice(3,6),4),re.tVertexAnim.set(Y.slice(6,9),8),re.wireframe.set([r?1:0]),this.device.queue.writeBuffer(y,0,L);const be=this.device.createBindGroup({label:`fs uniforms ${p} ${F}`,layout:this.fsBindGroupLayout,entries:[{binding:0,resource:{buffer:y}},{binding:1,resource:this.rendererData.gpuSamplers[A]},{binding:2,resource:(this.rendererData.gpuTextures[M.Image]||this.rendererData.gpuEmptyTexture).createView()}]});h.setBindGroup(0,this.gpuVSUniformsBindGroup),h.setBindGroup(1,be),h.drawIndexed(r?U.Faces.length*2:U.Faces.length)}}this.particlesEnabled&&this.particlesController.renderGPU(h,e,i),this.ribbonsEnabled&&this.ribbonsController.renderGPU(h,e,i),h.end();const x=v.finish();this.device.queue.submit([x]);return}if(n&&this.renderEnvironment(e,i),this.gl.useProgram(this.shaderProgram),this.gl.uniformMatrix4fv(this.shaderProgramLocations.pMatrixUniform,!1,i),this.gl.uniformMatrix4fv(this.shaderProgramLocations.mvMatrixUniform,!1,e),this.gl.uniform1f(this.shaderProgramLocations.wireframeUniform,r?1:0),this.gl.enableVertexAttribArray(this.shaderProgramLocations.vertexPositionAttribute),this.gl.enableVertexAttribArray(this.shaderProgramLocations.normalsAttribute),this.gl.enableVertexAttribArray(this.shaderProgramLocations.textureCoordAttribute),this.isHD?(this.gl.enableVertexAttribArray(this.shaderProgramLocations.skinAttribute),this.gl.enableVertexAttribArray(this.shaderProgramLocations.weightAttribute),this.gl.enableVertexAttribArray(this.shaderProgramLocations.tangentAttribute)):this.softwareSkinning||this.gl.enableVertexAttribArray(this.shaderProgramLocations.groupAttribute),!this.softwareSkinning)for(let c=0;c<J;++c)this.rendererData.nodes[c]&&this.gl.uniformMatrix4fv(this.shaderProgramLocations.nodesMatricesAttributes[c],!1,this.rendererData.nodes[c].matrix);for(let c=0;c<this.model.Geosets.length;++c){const v=this.model.Geosets[c];if(this.rendererData.geosetAlpha[c]<1e-6||v.LevelOfDetail!==void 0&&v.LevelOfDetail!==o)continue;this.softwareSkinning&&this.generateGeosetVertices(c);const h=v.MaterialID,B=this.model.Materials[h];if(this.isHD){this.gl.uniform3fv(this.shaderProgramLocations.lightPosUniform,this.rendererData.lightPos),this.gl.uniform3fv(this.shaderProgramLocations.lightColorUniform,this.rendererData.lightColor),this.gl.uniform3fv(this.shaderProgramLocations.cameraPosUniform,this.rendererData.cameraPos),a&&f?(this.gl.uniform3f(this.shaderProgramLocations.shadowParamsUniform,1,l??1e-6,u??1/1024),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,a),this.gl.uniform1i(this.shaderProgramLocations.shadowMapSamplerUniform,3),this.gl.uniformMatrix4fv(this.shaderProgramLocations.shadowMapLightMatrixUniform,!1,f)):this.gl.uniform3f(this.shaderProgramLocations.shadowParamsUniform,0,0,0);const C=this.model.Version>=1100&&((T=B.Layers.find(p=>p.ShaderTypeId===1&&typeof p.ReflectionsTextureID=="number"))==null?void 0:T.ReflectionsTextureID)||((b=B.Layers[5])==null?void 0:b.TextureID),x=(w=this.model.Textures[C])==null?void 0:w.Image,E=this.rendererData.irradianceMap[x],U=this.rendererData.prefilteredEnvMap[x];s&&E&&U?(this.gl.uniform1i(this.shaderProgramLocations.hasEnvUniform,1),this.gl.activeTexture(this.gl.TEXTURE4),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,E),this.gl.uniform1i(this.shaderProgramLocations.irradianceMapUniform,4),this.gl.activeTexture(this.gl.TEXTURE5),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,U),this.gl.uniform1i(this.shaderProgramLocations.prefilteredEnvUniform,5),this.gl.activeTexture(this.gl.TEXTURE6),this.gl.bindTexture(this.gl.TEXTURE_2D,this.brdfLUT),this.gl.uniform1i(this.shaderProgramLocations.brdfLUTUniform,6)):(this.gl.uniform1i(this.shaderProgramLocations.hasEnvUniform,0),this.gl.uniform1i(this.shaderProgramLocations.irradianceMapUniform,4),this.gl.uniform1i(this.shaderProgramLocations.prefilteredEnvUniform,5),this.gl.uniform1i(this.shaderProgramLocations.brdfLUTUniform,6)),this.setLayerPropsHD(h,B.Layers),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vertexBuffer[c]),this.gl.vertexAttribPointer(this.shaderProgramLocations.vertexPositionAttribute,3,this.gl.FLOAT,!1,0,0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.normalBuffer[c]),this.gl.vertexAttribPointer(this.shaderProgramLocations.normalsAttribute,3,this.gl.FLOAT,!1,0,0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.texCoordBuffer[c]),this.gl.vertexAttribPointer(this.shaderProgramLocations.textureCoordAttribute,2,this.gl.FLOAT,!1,0,0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.skinWeightBuffer[c]),this.gl.vertexAttribPointer(this.shaderProgramLocations.skinAttribute,4,this.gl.UNSIGNED_BYTE,!1,8,0),this.gl.vertexAttribPointer(this.shaderProgramLocations.weightAttribute,4,this.gl.UNSIGNED_BYTE,!0,8,4),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.tangentBuffer[c]),this.gl.vertexAttribPointer(this.shaderProgramLocations.tangentAttribute,4,this.gl.FLOAT,!1,0,0),r&&!this.wireframeIndexBuffer[c]&&this.createWireframeBuffer(c),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,r?this.wireframeIndexBuffer[c]:this.indexBuffer[c]),this.gl.drawElements(r?this.gl.LINES:this.gl.TRIANGLES,r?v.Faces.length*2:v.Faces.length,this.gl.UNSIGNED_SHORT,0),a&&f&&(this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,null))}else for(let C=0;C<B.Layers.length;++C)this.setLayerProps(B.Layers[C],this.rendererData.materialLayerTextureID[h][C]),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vertexBuffer[c]),this.gl.vertexAttribPointer(this.shaderProgramLocations.vertexPositionAttribute,3,this.gl.FLOAT,!1,0,0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.normalBuffer[c]),this.gl.vertexAttribPointer(this.shaderProgramLocations.normalsAttribute,3,this.gl.FLOAT,!1,0,0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.texCoordBuffer[c]),this.gl.vertexAttribPointer(this.shaderProgramLocations.textureCoordAttribute,2,this.gl.FLOAT,!1,0,0),this.softwareSkinning||(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.groupBuffer[c]),this.gl.vertexAttribPointer(this.shaderProgramLocations.groupAttribute,4,this.gl.UNSIGNED_SHORT,!1,0,0)),r&&!this.wireframeIndexBuffer[c]&&this.createWireframeBuffer(c),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,r?this.wireframeIndexBuffer[c]:this.indexBuffer[c]),this.gl.drawElements(r?this.gl.LINES:this.gl.TRIANGLES,r?v.Faces.length*2:v.Faces.length,this.gl.UNSIGNED_SHORT,0)}this.gl.disableVertexAttribArray(this.shaderProgramLocations.vertexPositionAttribute),this.gl.disableVertexAttribArray(this.shaderProgramLocations.normalsAttribute),this.gl.disableVertexAttribArray(this.shaderProgramLocations.textureCoordAttribute),this.isHD?(this.gl.disableVertexAttribArray(this.shaderProgramLocations.skinAttribute),this.gl.disableVertexAttribArray(this.shaderProgramLocations.weightAttribute),this.gl.disableVertexAttribArray(this.shaderProgramLocations.tangentAttribute)):this.softwareSkinning||this.gl.disableVertexAttribArray(this.shaderProgramLocations.groupAttribute),this.particlesEnabled&&this.particlesController.render(e,i),this.ribbonsEnabled&&this.ribbonsController.render(e,i)}}renderEnvironmentGPU(e,i,r){e.setPipeline(this.envPiepeline);const n=new ArrayBuffer(128),o={mvMatrix:new Float32Array(n,0,16),pMatrix:new Float32Array(n,64,16)};o.mvMatrix.set(i),o.pMatrix.set(r),this.device.queue.writeBuffer(this.envVSUniformsBuffer,0,n),e.setBindGroup(0,this.envVSBindGroup);for(const s in this.rendererData.gpuEnvTextures){const a=this.device.createBindGroup({label:`env fs uniforms ${s}`,layout:this.envFSBindGroupLayout,entries:[{binding:0,resource:this.envSampler},{binding:1,resource:this.rendererData.gpuEnvTextures[s].createView({dimension:"cube"})}]});e.setBindGroup(1,a),e.setPipeline(this.envPiepeline),e.setVertexBuffer(0,this.cubeGPUVertexBuffer),e.draw(36)}}renderEnvironment(e,i){if(Pe(this.gl)){this.gl.disable(this.gl.BLEND),this.gl.disable(this.gl.DEPTH_TEST),this.gl.disable(this.gl.CULL_FACE);for(const r in this.rendererData.envTextures)this.gl.useProgram(this.envSphere.program),this.gl.uniformMatrix4fv(this.envSphere.uniforms.uPMatrix,!1,i),this.gl.uniformMatrix4fv(this.envSphere.uniforms.uMVMatrix,!1,e),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,this.rendererData.envTextures[r]),this.gl.uniform1i(this.envSphere.uniforms.uEnvironmentMap,0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.cubeVertexBuffer),this.gl.enableVertexAttribArray(this.envSphere.attributes.aPos),this.gl.vertexAttribPointer(this.envSphere.attributes.aPos,3,this.gl.FLOAT,!1,0,0),this.gl.drawArrays(this.gl.TRIANGLES,0,36),this.gl.disableVertexAttribArray(this.envSphere.attributes.aPos),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,null)}}renderSkeleton(e,i,r){var u,g,S;const n=[],o=[],s=(m,T)=>{d.transformMat4(de,m.node.PivotPoint,m.matrix),n.push(de[0],de[1],de[2]),d.transformMat4(de,T.node.PivotPoint,T.matrix),n.push(de[0],de[1],de[2]),o.push(0,1,0,0,0,1)},a=m=>{(m.node.Parent||m.node.Parent===0)&&(!r||r.includes(m.node.Name))&&s(m,this.rendererData.nodes[m.node.Parent]);for(const T of m.childs)a(T)};if(a(this.rendererData.rootNode),!n.length)return;const f=new Float32Array(n),l=new Float32Array(o);if(this.device){this.skeletonShaderModule||(this.skeletonShaderModule=this.device.createShaderModule({label:"skeleton",code:Nn})),this.skeletonBindGroupLayout||(this.skeletonBindGroupLayout=this.device.createBindGroupLayout({label:"skeleton bind group layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform",hasDynamicOffset:!1,minBindingSize:128}}]})),this.skeletonPipelineLayout||(this.skeletonPipelineLayout=this.device.createPipelineLayout({label:"skeleton pipeline layout",bindGroupLayouts:[this.skeletonBindGroupLayout]})),this.skeletonPipeline||(this.skeletonPipeline=this.device.createRenderPipeline({label:"skeleton pipeline",layout:this.skeletonPipelineLayout,vertex:{module:this.skeletonShaderModule,buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]},{arrayStride:12,attributes:[{shaderLocation:1,offset:0,format:"float32x3"}]}]},fragment:{module:this.skeletonShaderModule,targets:[{format:navigator.gpu.getPreferredCanvasFormat(),blend:{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"line-list"}})),(u=this.skeletonGPUVertexBuffer)==null||u.destroy(),(g=this.skeletonGPUColorBuffer)==null||g.destroy(),(S=this.skeletonGPUUniformsBuffer)==null||S.destroy();const m=this.skeletonGPUVertexBuffer=this.device.createBuffer({label:"skeleton vertex",size:f.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});new Float32Array(m.getMappedRange(0,m.size)).set(f),m.unmap();const T=this.skeletonGPUColorBuffer=this.device.createBuffer({label:"skeleton color",size:l.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});new Float32Array(T.getMappedRange(0,T.size)).set(l),T.unmap();const b=this.skeletonGPUUniformsBuffer=this.device.createBuffer({label:"skeleton vs uniforms",size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),w=this.device.createBindGroup({label:"skeleton uniforms bind group",layout:this.skeletonBindGroupLayout,entries:[{binding:0,resource:{buffer:b}}]}),c={label:"skeleton renderPass",colorAttachments:[{view:this.gpuContext.getCurrentTexture().createView(),clearValue:[.15,.15,.15,1],loadOp:"load",storeOp:"store"}]},v=this.device.createCommandEncoder(),h=v.beginRenderPass(c),B=new ArrayBuffer(128),C={mvMatrix:new Float32Array(B,0,16),pMatrix:new Float32Array(B,64,16)};C.mvMatrix.set(e),C.pMatrix.set(i),this.device.queue.writeBuffer(b,0,B),h.setVertexBuffer(0,m),h.setVertexBuffer(1,T),h.setPipeline(this.skeletonPipeline),h.setBindGroup(0,w),h.draw(f.length/3),h.end();const x=v.finish();this.device.queue.submit([x]);return}this.skeletonShaderProgram||(this.skeletonShaderProgram=this.initSkeletonShaderProgram()),this.gl.disable(this.gl.BLEND),this.gl.disable(this.gl.DEPTH_TEST),this.gl.useProgram(this.skeletonShaderProgram),this.gl.uniformMatrix4fv(this.skeletonShaderProgramLocations.pMatrixUniform,!1,i),this.gl.uniformMatrix4fv(this.skeletonShaderProgramLocations.mvMatrixUniform,!1,e),this.gl.enableVertexAttribArray(this.skeletonShaderProgramLocations.vertexPositionAttribute),this.gl.enableVertexAttribArray(this.skeletonShaderProgramLocations.colorAttribute),this.skeletonVertexBuffer||(this.skeletonVertexBuffer=this.gl.createBuffer()),this.skeletonColorBuffer||(this.skeletonColorBuffer=this.gl.createBuffer()),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.skeletonVertexBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,f,this.gl.DYNAMIC_DRAW),this.gl.vertexAttribPointer(this.skeletonShaderProgramLocations.vertexPositionAttribute,3,this.gl.FLOAT,!1,0,0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.skeletonColorBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,l,this.gl.DYNAMIC_DRAW),this.gl.vertexAttribPointer(this.skeletonShaderProgramLocations.colorAttribute,3,this.gl.FLOAT,!1,0,0),this.gl.drawArrays(this.gl.LINES,0,f.length/3),this.gl.disableVertexAttribArray(this.skeletonShaderProgramLocations.vertexPositionAttribute),this.gl.disableVertexAttribArray(this.skeletonShaderProgramLocations.colorAttribute)}initSkeletonShaderProgram(){const e=this.skeletonVertexShader=Le(this.gl,An,this.gl.VERTEX_SHADER),i=this.skeletonFragmentShader=Le(this.gl,Un,this.gl.FRAGMENT_SHADER),r=this.gl.createProgram();return this.gl.attachShader(r,e),this.gl.attachShader(r,i),this.gl.linkProgram(r),this.gl.getProgramParameter(r,this.gl.LINK_STATUS)||alert("Could not initialise shaders"),this.gl.useProgram(r),this.skeletonShaderProgramLocations.vertexPositionAttribute=this.gl.getAttribLocation(r,"aVertexPosition"),this.skeletonShaderProgramLocations.colorAttribute=this.gl.getAttribLocation(r,"aColor"),this.skeletonShaderProgramLocations.pMatrixUniform=this.gl.getUniformLocation(r,"uPMatrix"),this.skeletonShaderProgramLocations.mvMatrixUniform=this.gl.getUniformLocation(r,"uMVMatrix"),r}generateGeosetVertices(e){const i=this.model.Geosets[e],r=this.vertices[e];for(let n=0;n<r.length;n+=3){const o=n/3,s=i.Groups[i.VertexGroup[o]];d.set(de,i.Vertices[n],i.Vertices[n+1],i.Vertices[n+2]),d.set(Tt,0,0,0);for(let a=0;a<s.length;++a)d.add(Tt,Tt,d.transformMat4(eo,de,this.rendererData.nodes[s[a]].matrix));d.scale(de,Tt,1/s.length),r[n]=de[0],r[n+1]=de[1],r[n+2]=de[2]}this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vertexBuffer[e]),this.gl.bufferData(this.gl.ARRAY_BUFFER,r,this.gl.DYNAMIC_DRAW)}setTextureParameters(e,i){if(e&Ze.WrapWidth?this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.REPEAT):this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),e&Ze.WrapHeight?this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.REPEAT):this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,i?this.gl.LINEAR_MIPMAP_NEAREST:this.gl.LINEAR),this.anisotropicExt){const r=this.gl.getParameter(this.anisotropicExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);this.gl.texParameterf(this.gl.TEXTURE_2D,this.anisotropicExt.TEXTURE_MAX_ANISOTROPY_EXT,r)}}processEnvMaps(e){if(!this.rendererData.requiredEnvMaps[e]||!(this.rendererData.textures[e]||this.rendererData.gpuTextures[e])||!(Pe(this.gl)||this.device)||!(this.colorBufferFloatExt||this.device))return;this.gl&&(this.gl.disable(this.gl.BLEND),this.gl.disable(this.gl.DEPTH_TEST),this.gl.disable(this.gl.CULL_FACE));const i=H.create(),r=H.create(),n=d.fromValues(0,0,0);let o,s;this.device?(o=[d.fromValues(1,0,0),d.fromValues(-1,0,0),d.fromValues(0,-1,0),d.fromValues(0,1,0),d.fromValues(0,0,1),d.fromValues(0,0,-1)],s=[d.fromValues(0,-1,0),d.fromValues(0,-1,0),d.fromValues(0,0,-1),d.fromValues(0,0,1),d.fromValues(0,-1,0),d.fromValues(0,-1,0)]):(o=[d.fromValues(1,0,0),d.fromValues(-1,0,0),d.fromValues(0,1,0),d.fromValues(0,-1,0),d.fromValues(0,0,1),d.fromValues(0,0,-1)],s=[d.fromValues(0,-1,0),d.fromValues(0,-1,0),d.fromValues(0,0,1),d.fromValues(0,0,-1),d.fromValues(0,-1,0),d.fromValues(0,-1,0)]),H.perspective(i,Math.PI/2,1,.1,10);let a,f,l;if(this.device){l=this.rendererData.gpuEnvTextures[e]=this.device.createTexture({label:`env cubemap ${e}`,size:[Je,Je,6],format:navigator.gpu.getPreferredCanvasFormat(),usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,mipLevelCount:De});const u=this.device.createCommandEncoder({label:"env to cubemap"}),g=[];for(let m=0;m<6;++m){H.lookAt(r,n,o[m],s[m]);const T=u.beginRenderPass({label:"env to cubemap",colorAttachments:[{view:l.createView({dimension:"2d",baseArrayLayer:m,baseMipLevel:0,mipLevelCount:1}),clearValue:[0,0,0,1],loadOp:"clear",storeOp:"store"}]}),b=new ArrayBuffer(128),w={mvMatrix:new Float32Array(b,0,16),pMatrix:new Float32Array(b,64,16)};w.mvMatrix.set(r),w.pMatrix.set(i);const c=this.device.createBuffer({label:`env to cubemap vs uniforms ${m}`,size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});g.push(c),this.device.queue.writeBuffer(c,0,b);const v=this.device.createBindGroup({label:`env to cubemap vs bind group ${m}`,layout:this.envToCubemapVSBindGroupLayout,entries:[{binding:0,resource:{buffer:c}}]});T.setBindGroup(0,v);const h=this.device.createBindGroup({label:`env to cubemap fs uniforms ${m}`,layout:this.envToCubemapFSBindGroupLayout,entries:[{binding:0,resource:this.envToCubemapSampler},{binding:1,resource:this.rendererData.gpuTextures[e].createView()}]});T.setBindGroup(1,h),T.setPipeline(this.envToCubemapPiepeline),T.setVertexBuffer(0,this.cubeGPUVertexBuffer),T.draw(36),T.end()}const S=u.finish();this.device.queue.submit([S]),this.device.queue.onSubmittedWorkDone().finally(()=>{g.forEach(m=>{m.destroy()})})}else if(Pe(this.gl)){a=this.gl.createFramebuffer(),this.gl.useProgram(this.envToCubemap.program),f=this.rendererData.envTextures[e]=this.gl.createTexture(),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,f);for(let u=0;u<6;++u)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+u,0,this.gl.RGBA16F,Je,Je,0,this.gl.RGBA,this.gl.FLOAT,null);this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_WRAP_R,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.cubeVertexBuffer),this.gl.enableVertexAttribArray(this.envToCubemap.attributes.aPos),this.gl.vertexAttribPointer(this.envToCubemap.attributes.aPos,3,this.gl.FLOAT,!1,0,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,a),this.gl.uniformMatrix4fv(this.envToCubemap.uniforms.uPMatrix,!1,i),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.rendererData.textures[e]),this.gl.uniform1i(this.envToCubemap.uniforms.uEquirectangularMap,0),this.gl.viewport(0,0,Je,Je);for(let u=0;u<6;++u)this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+u,f,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),H.lookAt(r,n,o[u],s[u]),this.gl.uniformMatrix4fv(this.envToCubemap.uniforms.uMVMatrix,!1,r),this.gl.drawArrays(this.gl.TRIANGLES,0,36);this.gl.disableVertexAttribArray(this.envToCubemap.attributes.aPos),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}if(this.device?fr(this.device,l):(this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,f),this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,null)),this.device){l=this.rendererData.gpuIrradianceMap[e]=this.device.createTexture({label:`convolute diffuse ${e}`,size:[et,et,6],format:navigator.gpu.getPreferredCanvasFormat(),usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,mipLevelCount:5});const u=this.device.createCommandEncoder({label:"convolute diffuse"}),g=[];for(let m=0;m<6;++m){H.lookAt(r,n,o[m],s[m]);const T=u.beginRenderPass({label:"convolute diffuse",colorAttachments:[{view:l.createView({dimension:"2d",baseArrayLayer:m,baseMipLevel:0,mipLevelCount:1}),clearValue:[0,0,0,1],loadOp:"clear",storeOp:"store"}]}),b=new ArrayBuffer(128),w={mvMatrix:new Float32Array(b,0,16),pMatrix:new Float32Array(b,64,16)};w.mvMatrix.set(r),w.pMatrix.set(i);const c=this.device.createBuffer({label:`convolute diffuse vs uniforms ${m}`,size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});g.push(c),this.device.queue.writeBuffer(c,0,b);const v=this.device.createBindGroup({label:`convolute diffuse vs bind group ${m}`,layout:this.convoluteDiffuseEnvVSBindGroupLayout,entries:[{binding:0,resource:{buffer:c}}]});T.setBindGroup(0,v);const h=this.device.createBindGroup({label:`convolute diffuse fs uniforms ${m}`,layout:this.convoluteDiffuseEnvFSBindGroupLayout,entries:[{binding:0,resource:this.convoluteDiffuseEnvSampler},{binding:1,resource:this.rendererData.gpuEnvTextures[e].createView({dimension:"cube"})}]});T.setBindGroup(1,h),T.setPipeline(this.convoluteDiffuseEnvPiepeline),T.setVertexBuffer(0,this.cubeGPUVertexBuffer),T.draw(36),T.end()}const S=u.finish();this.device.queue.submit([S]),this.device.queue.onSubmittedWorkDone().finally(()=>{g.forEach(m=>{m.destroy()})})}else if(Pe(this.gl)){this.gl.useProgram(this.convoluteDiffuseEnv.program);const u=this.rendererData.irradianceMap[e]=this.gl.createTexture();this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,u);for(let g=0;g<6;++g)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+g,0,this.gl.RGBA16F,et,et,0,this.gl.RGBA,this.gl.FLOAT,null);this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_WRAP_R,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.cubeVertexBuffer),this.gl.enableVertexAttribArray(this.convoluteDiffuseEnv.attributes.aPos),this.gl.vertexAttribPointer(this.convoluteDiffuseEnv.attributes.aPos,3,this.gl.FLOAT,!1,0,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,a),this.gl.uniformMatrix4fv(this.convoluteDiffuseEnv.uniforms.uPMatrix,!1,i),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,this.rendererData.envTextures[e]),this.gl.uniform1i(this.convoluteDiffuseEnv.uniforms.uEnvironmentMap,0),this.gl.viewport(0,0,et,et);for(let g=0;g<6;++g)this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+g,u,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),H.lookAt(r,n,o[g],s[g]),this.gl.uniformMatrix4fv(this.convoluteDiffuseEnv.uniforms.uMVMatrix,!1,r),this.gl.drawArrays(this.gl.TRIANGLES,0,36);this.gl.disableVertexAttribArray(this.convoluteDiffuseEnv.attributes.aPos),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,u),this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP)}if(this.device){const u=this.rendererData.gpuPrefilteredEnvMap[e]=this.device.createTexture({label:`prefilter env ${e}`,size:[Ye,Ye,6],format:navigator.gpu.getPreferredCanvasFormat(),usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,mipLevelCount:De}),g=this.device.createCommandEncoder({label:"prefilter env"}),S=[];for(let T=0;T<De;++T){const b=new ArrayBuffer(4),w={roughness:new Float32Array(b)},c=T/(De-1);w.roughness.set([c]);const v=this.device.createBuffer({label:`prefilter env fs uniforms ${T}`,size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});S.push(v),this.device.queue.writeBuffer(v,0,b);const h=this.device.createBindGroup({label:`prefilter env fs uniforms ${T}`,layout:this.prefilterEnvFSBindGroupLayout,entries:[{binding:0,resource:{buffer:v}},{binding:1,resource:this.prefilterEnvSampler},{binding:2,resource:this.rendererData.gpuEnvTextures[e].createView({dimension:"cube"})}]});for(let B=0;B<6;++B){const C=g.beginRenderPass({label:"prefilter env",colorAttachments:[{view:u.createView({dimension:"2d",baseArrayLayer:B,baseMipLevel:T,mipLevelCount:1}),clearValue:[0,0,0,1],loadOp:"clear",storeOp:"store"}]});H.lookAt(r,n,o[B],s[B]);const x=new ArrayBuffer(128),E={mvMatrix:new Float32Array(x,0,16),pMatrix:new Float32Array(x,64,16)};E.mvMatrix.set(r),E.pMatrix.set(i);const U=this.device.createBuffer({label:"prefilter env vs uniforms",size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});S.push(U),this.device.queue.writeBuffer(U,0,x);const p=this.device.createBindGroup({label:"prefilter env vs bind group",layout:this.prefilterEnvVSBindGroupLayout,entries:[{binding:0,resource:{buffer:U}}]});C.setPipeline(this.prefilterEnvPiepeline),C.setBindGroup(0,p),C.setBindGroup(1,h),C.setVertexBuffer(0,this.cubeGPUVertexBuffer),C.draw(36),C.end()}}const m=g.finish();this.device.queue.submit([m]),this.device.queue.onSubmittedWorkDone().finally(()=>{S.forEach(T=>{T.destroy()})})}else if(Pe(this.gl)){this.gl.useProgram(this.prefilterEnv.program);const u=this.rendererData.prefilteredEnvMap[e]=this.gl.createTexture();this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,u),this.gl.texStorage2D(this.gl.TEXTURE_CUBE_MAP,De,this.gl.RGBA16F,Ye,Ye);for(let g=0;g<De;++g)for(let S=0;S<6;++S){const m=Ye*.5**g,T=new Float32Array(m*m*4);this.gl.texSubImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+S,g,0,0,m,m,this.gl.RGBA,this.gl.FLOAT,T)}this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_WRAP_R,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR),this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.cubeVertexBuffer),this.gl.enableVertexAttribArray(this.prefilterEnv.attributes.aPos),this.gl.vertexAttribPointer(this.prefilterEnv.attributes.aPos,3,this.gl.FLOAT,!1,0,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,a),this.gl.uniformMatrix4fv(this.prefilterEnv.uniforms.uPMatrix,!1,i),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,this.rendererData.envTextures[e]),this.gl.uniform1i(this.prefilterEnv.uniforms.uEnvironmentMap,0);for(let g=0;g<De;++g){const S=Ye*.5**g,m=Ye*.5**g;this.gl.viewport(0,0,S,m);const T=g/(De-1);this.gl.uniform1f(this.prefilterEnv.uniforms.uRoughness,T);for(let b=0;b<6;++b)this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+b,u,g),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),H.lookAt(r,n,o[b],s[b]),this.gl.uniformMatrix4fv(this.prefilterEnv.uniforms.uMVMatrix,!1,r),this.gl.drawArrays(this.gl.TRIANGLES,0,36)}this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP,null),this.gl.deleteFramebuffer(a)}}initShaderProgram(e,i,r,n){const o=Le(this.gl,e,this.gl.VERTEX_SHADER),s=Le(this.gl,i,this.gl.FRAGMENT_SHADER),a=this.gl.createProgram();if(this.gl.attachShader(a,o),this.gl.attachShader(a,s),this.gl.linkProgram(a),!this.gl.getProgramParameter(a,this.gl.LINK_STATUS))throw new Error("Could not initialise shaders");const f={};for(const u in r)if(f[u]=this.gl.getAttribLocation(a,u),f[u]<0)throw new Error("Missing shader attribute location: "+u);const l={};for(const u in n)if(l[u]=this.gl.getUniformLocation(a,u),!l[u])throw new Error("Missing shader uniform location: "+u);return{program:a,vertexShader:o,fragmentShader:s,attributes:f,uniforms:l}}destroyShaderProgramObject(e){e.program&&(e.vertexShader&&(this.gl.detachShader(e.program,e.vertexShader),this.gl.deleteShader(e.vertexShader),e.vertexShader=null),e.fragmentShader&&(this.gl.detachShader(e.program,e.fragmentShader),this.gl.deleteShader(e.fragmentShader),e.fragmentShader=null),this.gl.deleteProgram(e.program),e.program=null)}initShaders(){if(this.shaderProgram)return;let e;this.isHD?e=Pe(this.gl)?$n:Kn:this.softwareSkinning?e=xn:e=Yn;let i;this.isHD?i=Pe(this.gl)?jn:Sn:i=bn;const r=this.vertexShader=Le(this.gl,e,this.gl.VERTEX_SHADER),n=this.fragmentShader=Le(this.gl,i,this.gl.FRAGMENT_SHADER),o=this.shaderProgram=this.gl.createProgram();if(this.gl.attachShader(o,r),this.gl.attachShader(o,n),this.gl.linkProgram(o),this.gl.getProgramParameter(o,this.gl.LINK_STATUS)||alert("Could not initialise shaders"),this.gl.useProgram(o),this.shaderProgramLocations.vertexPositionAttribute=this.gl.getAttribLocation(o,"aVertexPosition"),this.shaderProgramLocations.normalsAttribute=this.gl.getAttribLocation(o,"aNormal"),this.shaderProgramLocations.textureCoordAttribute=this.gl.getAttribLocation(o,"aTextureCoord"),this.isHD?(this.shaderProgramLocations.skinAttribute=this.gl.getAttribLocation(o,"aSkin"),this.shaderProgramLocations.weightAttribute=this.gl.getAttribLocation(o,"aBoneWeight"),this.shaderProgramLocations.tangentAttribute=this.gl.getAttribLocation(o,"aTangent")):this.softwareSkinning||(this.shaderProgramLocations.groupAttribute=this.gl.getAttribLocation(o,"aGroup")),this.shaderProgramLocations.pMatrixUniform=this.gl.getUniformLocation(o,"uPMatrix"),this.shaderProgramLocations.mvMatrixUniform=this.gl.getUniformLocation(o,"uMVMatrix"),this.shaderProgramLocations.samplerUniform=this.gl.getUniformLocation(o,"uSampler"),this.shaderProgramLocations.replaceableColorUniform=this.gl.getUniformLocation(o,"uReplaceableColor"),this.isHD?(this.shaderProgramLocations.normalSamplerUniform=this.gl.getUniformLocation(o,"uNormalSampler"),this.shaderProgramLocations.ormSamplerUniform=this.gl.getUniformLocation(o,"uOrmSampler"),this.shaderProgramLocations.lightPosUniform=this.gl.getUniformLocation(o,"uLightPos"),this.shaderProgramLocations.lightColorUniform=this.gl.getUniformLocation(o,"uLightColor"),this.shaderProgramLocations.cameraPosUniform=this.gl.getUniformLocation(o,"uCameraPos"),this.shaderProgramLocations.shadowParamsUniform=this.gl.getUniformLocation(o,"uShadowParams"),this.shaderProgramLocations.shadowMapSamplerUniform=this.gl.getUniformLocation(o,"uShadowMapSampler"),this.shaderProgramLocations.shadowMapLightMatrixUniform=this.gl.getUniformLocation(o,"uShadowMapLightMatrix"),this.shaderProgramLocations.hasEnvUniform=this.gl.getUniformLocation(o,"uHasEnv"),this.shaderProgramLocations.irradianceMapUniform=this.gl.getUniformLocation(o,"uIrradianceMap"),this.shaderProgramLocations.prefilteredEnvUniform=this.gl.getUniformLocation(o,"uPrefilteredEnv"),this.shaderProgramLocations.brdfLUTUniform=this.gl.getUniformLocation(o,"uBRDFLUT")):this.shaderProgramLocations.replaceableTypeUniform=this.gl.getUniformLocation(o,"uReplaceableType"),this.shaderProgramLocations.discardAlphaLevelUniform=this.gl.getUniformLocation(o,"uDiscardAlphaLevel"),this.shaderProgramLocations.tVertexAnimUniform=this.gl.getUniformLocation(o,"uTVertexAnim"),this.shaderProgramLocations.wireframeUniform=this.gl.getUniformLocation(o,"uWireframe"),!this.softwareSkinning){this.shaderProgramLocations.nodesMatricesAttributes=[];for(let s=0;s<J;++s)this.shaderProgramLocations.nodesMatricesAttributes[s]=this.gl.getUniformLocation(o,`uNodesMatrices[${s}]`)}this.isHD&&Pe(this.gl)&&(this.envToCubemap=this.initShaderProgram(yn,Cn,{aPos:"aPos"},{uPMatrix:"uPMatrix",uMVMatrix:"uMVMatrix",uEquirectangularMap:"uEquirectangularMap"}),this.envSphere=this.initShaderProgram(Bn,Dn,{aPos:"aPos"},{uPMatrix:"uPMatrix",uMVMatrix:"uMVMatrix",uEnvironmentMap:"uEnvironmentMap"}),this.convoluteDiffuseEnv=this.initShaderProgram(Ln,Fn,{aPos:"aPos"},{uPMatrix:"uPMatrix",uMVMatrix:"uMVMatrix",uEnvironmentMap:"uEnvironmentMap"}),this.prefilterEnv=this.initShaderProgram(Mn,Vn,{aPos:"aPos"},{uPMatrix:"uPMatrix",uMVMatrix:"uMVMatrix",uEnvironmentMap:"uEnvironmentMap",uRoughness:"uRoughness"}),this.integrateBRDF=this.initShaderProgram(Rn,wn,{aPos:"aPos"},{}))}initGPUShaders(){if(!this.gpuShaderModule){this.gpuShaderModule=this.device.createShaderModule({label:"main",code:this.isHD?Qn:Zn}),this.gpuDepthShaderModule=this.device.createShaderModule({label:"depth",code:Jn});for(let e=0;e<this.model.Textures.length;++e){const r=this.model.Textures[e].Flags,n=r&Ze.WrapWidth?"repeat":"clamp-to-edge",o=r&Ze.WrapHeight?"repeat":"clamp-to-edge";this.rendererData.gpuSamplers[e]=this.device.createSampler({label:`texture sampler ${e}`,minFilter:"linear",magFilter:"linear",mipmapFilter:"linear",maxAnisotropy:16,addressModeU:n,addressModeV:o})}this.rendererData.gpuDepthSampler=this.device.createSampler({label:"texture depth sampler",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",compare:"less",minFilter:"nearest",magFilter:"nearest"}),this.isHD&&(this.envShaderModeule=this.device.createShaderModule({label:"env",code:On}),this.envPiepeline=this.device.createRenderPipeline({label:"env",layout:"auto",vertex:{module:this.envShaderModeule,buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]}]},fragment:{module:this.envShaderModeule,targets:[{format:navigator.gpu.getPreferredCanvasFormat()}]},depthStencil:{depthWriteEnabled:!1,depthCompare:"always",format:"depth24plus"},multisample:{count:pt}}),this.envVSUniformsBuffer=this.device.createBuffer({label:"env vs uniforms",size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.envVSBindGroupLayout=this.envPiepeline.getBindGroupLayout(0),this.envVSBindGroup=this.device.createBindGroup({label:"env vs bind group",layout:this.envVSBindGroupLayout,entries:[{binding:0,resource:{buffer:this.envVSUniformsBuffer}}]}),this.envSampler=this.device.createSampler({label:"env cube sampler",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge",minFilter:"linear",magFilter:"linear"}),this.envFSBindGroupLayout=this.envPiepeline.getBindGroupLayout(1),this.envToCubemapShaderModule=this.device.createShaderModule({label:"env to cubemap",code:kn}),this.envToCubemapPiepeline=this.device.createRenderPipeline({label:"env to cubemap",layout:"auto",vertex:{module:this.envToCubemapShaderModule,buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]}]},fragment:{module:this.envToCubemapShaderModule,targets:[{format:navigator.gpu.getPreferredCanvasFormat()}]}}),this.envToCubemapVSBindGroupLayout=this.envToCubemapPiepeline.getBindGroupLayout(0),this.envToCubemapSampler=this.device.createSampler({label:"env to cubemap sampler",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"linear",magFilter:"linear"}),this.envToCubemapFSBindGroupLayout=this.envToCubemapPiepeline.getBindGroupLayout(1),this.convoluteDiffuseEnvShaderModule=this.device.createShaderModule({label:"convolute diffuse",code:Xn}),this.convoluteDiffuseEnvPiepeline=this.device.createRenderPipeline({label:"convolute diffuse",layout:"auto",vertex:{module:this.convoluteDiffuseEnvShaderModule,buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]}]},fragment:{module:this.convoluteDiffuseEnvShaderModule,targets:[{format:navigator.gpu.getPreferredCanvasFormat()}]}}),this.convoluteDiffuseEnvVSBindGroupLayout=this.convoluteDiffuseEnvPiepeline.getBindGroupLayout(0),this.convoluteDiffuseEnvFSBindGroupLayout=this.convoluteDiffuseEnvPiepeline.getBindGroupLayout(1),this.convoluteDiffuseEnvSampler=this.device.createSampler({label:"convolute diffuse",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"linear",magFilter:"linear"}),this.prefilterEnvShaderModule=this.device.createShaderModule({label:"prefilter env",code:Hn}),this.prefilterEnvPiepeline=this.device.createRenderPipeline({label:"prefilter env",layout:"auto",vertex:{module:this.prefilterEnvShaderModule,buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]}]},fragment:{module:this.prefilterEnvShaderModule,targets:[{format:navigator.gpu.getPreferredCanvasFormat()}]}}),this.prefilterEnvVSBindGroupLayout=this.prefilterEnvPiepeline.getBindGroupLayout(0),this.prefilterEnvFSBindGroupLayout=this.prefilterEnvPiepeline.getBindGroupLayout(1),this.prefilterEnvSampler=this.device.createSampler({label:"prefilter env",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge",minFilter:"linear",magFilter:"linear"}))}}createWireframeBuffer(e){const i=this.model.Geosets[e].Faces,r=new Uint16Array(i.length*2);for(let n=0;n<i.length;n+=3)r[n*2]=i[n],r[n*2+1]=i[n+1],r[n*2+2]=i[n+1],r[n*2+3]=i[n+2],r[n*2+4]=i[n+2],r[n*2+5]=i[n];this.wireframeIndexBuffer[e]=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.wireframeIndexBuffer[e]),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,r,this.gl.STATIC_DRAW)}createWireframeGPUBuffer(e){const i=this.model.Geosets[e].Faces,r=new Uint16Array(i.length*2);for(let n=0;n<i.length;n+=3)r[n*2]=i[n],r[n*2+1]=i[n+1],r[n*2+2]=i[n+1],r[n*2+3]=i[n+2],r[n*2+4]=i[n+2],r[n*2+5]=i[n];this.wireframeIndexGPUBuffer[e]=this.device.createBuffer({label:`wireframe ${e}`,size:r.byteLength,usage:GPUBufferUsage.INDEX,mappedAtCreation:!0}),new Uint16Array(this.wireframeIndexGPUBuffer[e].getMappedRange(0,this.wireframeIndexGPUBuffer[e].size)).set(r),this.wireframeIndexGPUBuffer[e].unmap()}initBuffers(){for(let e=0;e<this.model.Geosets.length;++e){const i=this.model.Geosets[e];if(this.vertexBuffer[e]=this.gl.createBuffer(),this.softwareSkinning?this.vertices[e]=new Float32Array(i.Vertices.length):(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vertexBuffer[e]),this.gl.bufferData(this.gl.ARRAY_BUFFER,i.Vertices,this.gl.STATIC_DRAW)),this.normalBuffer[e]=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.normalBuffer[e]),this.gl.bufferData(this.gl.ARRAY_BUFFER,i.Normals,this.gl.STATIC_DRAW),this.texCoordBuffer[e]=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.texCoordBuffer[e]),this.gl.bufferData(this.gl.ARRAY_BUFFER,i.TVertices[0],this.gl.STATIC_DRAW),this.isHD)this.skinWeightBuffer[e]=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.skinWeightBuffer[e]),this.gl.bufferData(this.gl.ARRAY_BUFFER,i.SkinWeights,this.gl.STATIC_DRAW),this.tangentBuffer[e]=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.tangentBuffer[e]),this.gl.bufferData(this.gl.ARRAY_BUFFER,i.Tangents,this.gl.STATIC_DRAW);else if(!this.softwareSkinning){this.groupBuffer[e]=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.groupBuffer[e]);const r=new Uint16Array(i.VertexGroup.length*4);for(let n=0;n<r.length;n+=4){const o=n/4,s=i.Groups[i.VertexGroup[o]];r[n]=s[0],r[n+1]=s.length>1?s[1]:J,r[n+2]=s.length>2?s[2]:J,r[n+3]=s.length>3?s[3]:J}this.gl.bufferData(this.gl.ARRAY_BUFFER,r,this.gl.STATIC_DRAW)}this.indexBuffer[e]=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer[e]),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,i.Faces,this.gl.STATIC_DRAW)}}createGPUPipeline(e,i,r,n=this.gpuShaderModule,o={}){return this.device.createRenderPipeline({label:`pipeline ${e}`,layout:this.gpuPipelineLayout,vertex:{module:n,buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]},{arrayStride:12,attributes:[{shaderLocation:1,offset:0,format:"float32x3"}]},{arrayStride:8,attributes:[{shaderLocation:2,offset:0,format:"float32x2"}]},...this.isHD?[{arrayStride:16,attributes:[{shaderLocation:3,offset:0,format:"float32x4"}]},{arrayStride:8,attributes:[{shaderLocation:4,offset:0,format:"uint8x4"}]},{arrayStride:8,attributes:[{shaderLocation:5,offset:4,format:"unorm8x4"}]}]:[{arrayStride:4,attributes:[{shaderLocation:3,offset:0,format:"uint8x4"}]}]]},fragment:{module:n,targets:[{format:navigator.gpu.getPreferredCanvasFormat(),blend:i}]},depthStencil:r,multisample:{count:pt},...o})}createGPUPipelineByLayer(e,i){return this.createGPUPipeline(...to[e],void 0,{primitive:{cullMode:i?"none":"back"}})}getGPUPipeline(e){const i=e.FilterMode||0,r=!!((e.Shading||0)&Ee.TwoSided),n=`${i}-${r}`;return this.gpuPipelines[n]||(this.gpuPipelines[n]=this.createGPUPipelineByLayer(i,r)),this.gpuPipelines[n]}initGPUPipeline(){this.vsBindGroupLayout=this.device.createBindGroupLayout({label:"vs bind group layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform",hasDynamicOffset:!1,minBindingSize:128+64*J}}]}),this.fsBindGroupLayout=this.device.createBindGroupLayout({label:"fs bind group layout2",entries:this.isHD?[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!1,minBindingSize:192}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}},{binding:3,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}},{binding:5,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:6,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}},{binding:7,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"comparison"}},{binding:8,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"depth",viewDimension:"2d",multisampled:!1}},{binding:9,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:10,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"cube",multisampled:!1}},{binding:11,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:12,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"cube",multisampled:!1}},{binding:13,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:14,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}}]:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!1,minBindingSize:80}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}}]}),this.gpuPipelineLayout=this.device.createPipelineLayout({label:"pipeline layout",bindGroupLayouts:[this.vsBindGroupLayout,this.fsBindGroupLayout]}),this.gpuWireframePipeline=this.createGPUPipeline("wireframe",{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one-minus-src-alpha"}},{depthWriteEnabled:!0,depthCompare:"less-equal",format:"depth24plus"},void 0,{primitive:{topology:"line-list"}}),this.isHD&&(this.gpuShadowPipeline=this.createGPUPipeline("shadow",void 0,{depthWriteEnabled:!0,depthCompare:"less-equal",format:"depth32float"},this.gpuDepthShaderModule,{fragment:{module:this.gpuDepthShaderModule,targets:[]},multisample:{count:1}})),this.gpuRenderPassDescriptor={label:"basic renderPass",colorAttachments:[{view:null,clearValue:[.15,.15,.15,1],loadOp:"clear",storeOp:"store"}]}}initGPUBuffers(){for(let e=0;e<this.model.Geosets.length;++e){const i=this.model.Geosets[e];if(this.gpuVertexBuffer[e]=this.device.createBuffer({label:`vertex ${e}`,size:i.Vertices.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(this.gpuVertexBuffer[e].getMappedRange(0,this.gpuVertexBuffer[e].size)).set(i.Vertices),this.gpuVertexBuffer[e].unmap(),this.gpuNormalBuffer[e]=this.device.createBuffer({label:`normal ${e}`,size:i.Normals.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(this.gpuNormalBuffer[e].getMappedRange(0,this.gpuNormalBuffer[e].size)).set(i.Normals),this.gpuNormalBuffer[e].unmap(),this.gpuTexCoordBuffer[e]=this.device.createBuffer({label:`texCoord ${e}`,size:i.TVertices[0].byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(this.gpuTexCoordBuffer[e].getMappedRange(0,this.gpuTexCoordBuffer[e].size)).set(i.TVertices[0]),this.gpuTexCoordBuffer[e].unmap(),this.isHD)this.gpuSkinWeightBuffer[e]=this.device.createBuffer({label:`SkinWeight ${e}`,size:i.SkinWeights.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Uint8Array(this.gpuSkinWeightBuffer[e].getMappedRange(0,this.gpuSkinWeightBuffer[e].size)).set(i.SkinWeights),this.gpuSkinWeightBuffer[e].unmap(),this.gpuTangentBuffer[e]=this.device.createBuffer({label:`Tangents ${e}`,size:i.Tangents.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(this.gpuTangentBuffer[e].getMappedRange(0,this.gpuTangentBuffer[e].size)).set(i.Tangents),this.gpuTangentBuffer[e].unmap();else{const n=new Uint8Array(i.VertexGroup.length*4);for(let o=0;o<n.length;o+=4){const s=o/4,a=i.Groups[i.VertexGroup[s]];n[o]=a[0],n[o+1]=a.length>1?a[1]:J,n[o+2]=a.length>2?a[2]:J,n[o+3]=a.length>3?a[3]:J}this.gpuGroupBuffer[e]=this.device.createBuffer({label:`group ${e}`,size:4*i.VertexGroup.length,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Uint8Array(this.gpuGroupBuffer[e].getMappedRange(0,this.gpuGroupBuffer[e].size)).set(n),this.gpuGroupBuffer[e].unmap()}const r=Math.ceil(i.Faces.byteLength/4)*4;this.gpuIndexBuffer[e]=this.device.createBuffer({label:`index ${e}`,size:2*r,usage:GPUBufferUsage.INDEX,mappedAtCreation:!0}),new Uint16Array(this.gpuIndexBuffer[e].getMappedRange(0,r)).set(i.Faces),this.gpuIndexBuffer[e].unmap()}}initGPUUniformBuffers(){this.gpuVSUniformsBuffer=this.device.createBuffer({label:"vs uniforms",size:128+64*J,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.gpuVSUniformsBindGroup=this.device.createBindGroup({label:"vs uniforms bind group",layout:this.vsBindGroupLayout,entries:[{binding:0,resource:{buffer:this.gpuVSUniformsBuffer}}]})}initGPUMultisampleTexture(){this.gpuMultisampleTexture=this.device.createTexture({label:"multisample texutre",size:[this.canvas.width,this.canvas.height],format:navigator.gpu.getPreferredCanvasFormat(),usage:GPUTextureUsage.RENDER_ATTACHMENT,sampleCount:pt})}initGPUDepthTexture(){this.gpuDepthTexture=this.device.createTexture({label:"depth texture",size:[this.canvas.width,this.canvas.height],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT,sampleCount:pt})}initGPUEmptyTexture(){const e=this.rendererData.gpuEmptyTexture=this.device.createTexture({label:"empty texture",size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});this.device.queue.writeTexture({texture:e},new Uint8Array([255,255,255,255]),{bytesPerRow:4},{width:1,height:1}),this.rendererData.gpuEmptyCubeTexture=this.device.createTexture({label:"empty cube texture",size:[1,1,6],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),this.rendererData.gpuDepthEmptyTexture=this.device.createTexture({label:"empty depth texture",size:[1,1],format:"depth32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST})}initCube(){const e=new Float32Array([-.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,-.5,-.5,-.5,-.5,.5,.5,-.5,.5,-.5,.5,.5,-.5,.5,.5,.5,-.5,.5,.5,.5,.5,-.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,.5,.5,.5,.5,.5,-.5,-.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,.5,-.5,-.5,.5,.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,-.5,.5,-.5,-.5,.5,.5,-.5,.5,-.5,.5,.5,-.5,.5,.5,.5,-.5,.5,.5,.5]);if(this.device){const i=this.cubeGPUVertexBuffer=this.device.createBuffer({label:"skeleton vertex",size:e.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});new Float32Array(i.getMappedRange(0,i.size)).set(e),i.unmap()}else this.cubeVertexBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.cubeVertexBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,e,this.gl.STATIC_DRAW)}initSquare(){this.squareVertexBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.squareVertexBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,-1,1,1,-1,1]),this.gl.STATIC_DRAW)}initBRDFLUT(){if(!Pe(this.gl)||!this.isHD||!this.colorBufferFloatExt)return;this.brdfLUT=this.gl.createTexture(),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.brdfLUT),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RG16F,tt,tt,0,this.gl.RG,this.gl.FLOAT,null),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR);const e=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.brdfLUT,0),this.gl.useProgram(this.integrateBRDF.program),this.gl.viewport(0,0,tt,tt),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.squareVertexBuffer),this.gl.enableVertexAttribArray(this.integrateBRDF.attributes.aPos),this.gl.vertexAttribPointer(this.integrateBRDF.attributes.aPos,2,this.gl.FLOAT,!1,0,0),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.deleteFramebuffer(e)}initGPUBRDFLUT(){const e=this.device.createShaderModule({label:"integrate brdf",code:zn});this.gpuBrdfLUT=this.device.createTexture({label:"brdf",size:[tt,tt],format:"rg16float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING});const i=new Float32Array([-1,-1,1,-1,-1,1,1,-1,1,1,-1,1]),r=this.device.createBuffer({label:"brdf square",size:i.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});new Float32Array(r.getMappedRange(0,r.size)).set(i),r.unmap();const n=this.device.createCommandEncoder({label:"integrate brdf"}),o=n.beginRenderPass({label:"integrate brdf",colorAttachments:[{view:this.gpuBrdfLUT.createView(),clearValue:[0,0,0,1],loadOp:"clear",storeOp:"store"}]});o.setPipeline(this.device.createRenderPipeline({label:"integrate brdf",layout:"auto",vertex:{module:e,buffers:[{arrayStride:8,attributes:[{shaderLocation:0,offset:0,format:"float32x2"}]}]},fragment:{module:e,targets:[{format:"rg16float"}]}})),o.setVertexBuffer(0,r),o.draw(6),o.end();const s=n.finish();this.device.queue.submit([s]),this.device.queue.onSubmittedWorkDone().finally(()=>{r.destroy()}),this.gpuBrdfSampler=this.device.createSampler({label:"brdf lut",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",minFilter:"linear",magFilter:"linear"})}updateGlobalSequences(e){for(let i=0;i<this.rendererData.globalSequencesFrames.length;++i)this.rendererData.globalSequencesFrames[i]+=e,this.rendererData.globalSequencesFrames[i]>this.model.GlobalSequences[i]&&(this.rendererData.globalSequencesFrames[i]=0)}updateNode(e){const i=this.interp.vec3(_t,e.node.Translation),r=this.interp.quat(Gt,e.node.Rotation),n=this.interp.vec3(It,e.node.Scaling);!i&&!r&&!n?H.identity(e.matrix):i&&!r&&!n?H.fromTranslation(e.matrix,i):!i&&r&&!n?mt(e.matrix,r,e.node.PivotPoint):H.fromRotationTranslationScaleOrigin(e.matrix,r||Ot,i||Nt,n||kt,e.node.PivotPoint),(e.node.Parent||e.node.Parent===0)&&H.mul(e.matrix,this.rendererData.nodes[e.node.Parent].matrix,e.matrix);const o=e.node.Flags&he.BillboardedLockX||e.node.Flags&he.BillboardedLockY||e.node.Flags&he.BillboardedLockZ;e.node.Flags&he.Billboarded?(d.transformMat4(Ke,e.node.PivotPoint,e.matrix),(e.node.Parent||e.node.Parent===0)&&(H.getRotation(vt,this.rendererData.nodes[e.node.Parent].matrix),ue.invert(vt,vt),mt(hr,vt,Ke),H.mul(e.matrix,hr,e.matrix)),mt(ur,this.rendererData.cameraQuat,Ke),H.mul(e.matrix,ur,e.matrix)):o&&(d.transformMat4(Ke,e.node.PivotPoint,e.matrix),d.copy(Be,e.node.PivotPoint),e.node.Flags&he.BillboardedLockX?Be[0]+=1:e.node.Flags&he.BillboardedLockY?Be[1]+=1:e.node.Flags&he.BillboardedLockZ&&(Be[2]+=1),d.transformMat4(Be,Be,e.matrix),d.sub(Be,Be,Ke),d.set(Ge,1,0,0),d.add(Ge,Ge,e.node.PivotPoint),d.transformMat4(Ge,Ge,e.matrix),d.sub(Ge,Ge,Ke),d.set(xt,-1,0,0),d.transformQuat(xt,xt,this.rendererData.cameraQuat),d.cross(gr,Be,xt),d.cross(bt,Be,gr),d.normalize(bt,bt),ue.rotationTo(cr,Ge,bt),mt(dr,cr,Ke),H.mul(e.matrix,dr,e.matrix));for(const s of e.childs)this.updateNode(s)}findAlpha(e){const i=this.rendererData.geosetAnims[e];if(!i||i.Alpha===void 0)return 1;if(typeof i.Alpha=="number")return i.Alpha;const r=this.interp.num(i.Alpha);return r===null?1:r}getTexCoordMatrix(e){if(typeof e.TVertexAnimId=="number"){const i=this.rendererData.model.TextureAnims[e.TVertexAnimId],r=this.interp.vec3(_t,i.Translation),n=this.interp.quat(Gt,i.Rotation),o=this.interp.vec3(It,i.Scaling);return H.fromRotationTranslationScale(ge,n||Ot,r||Nt,o||kt),Ut.set(Pt,ge[0],ge[1],0,ge[4],ge[5],0,ge[12],ge[13],0),Pt}else return mr}setLayerProps(e,i){const r=this.model.Textures[i];e.Shading&Ee.TwoSided?this.gl.disable(this.gl.CULL_FACE):this.gl.enable(this.gl.CULL_FACE),e.FilterMode===z.Transparent?this.gl.uniform1f(this.shaderProgramLocations.discardAlphaLevelUniform,.75):this.gl.uniform1f(this.shaderProgramLocations.discardAlphaLevelUniform,0),e.FilterMode===z.None?(this.gl.disable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.depthMask(!0)):e.FilterMode===z.Transparent?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.depthMask(!0)):e.FilterMode===z.Blend?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.depthMask(!1)):e.FilterMode===z.Additive?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFunc(this.gl.SRC_COLOR,this.gl.ONE),this.gl.depthMask(!1)):e.FilterMode===z.AddAlpha?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE),this.gl.depthMask(!1)):e.FilterMode===z.Modulate?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.ZERO,this.gl.SRC_COLOR,this.gl.ZERO,this.gl.ONE),this.gl.depthMask(!1)):e.FilterMode===z.Modulate2x&&(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.DST_COLOR,this.gl.SRC_COLOR,this.gl.ZERO,this.gl.ONE),this.gl.depthMask(!1)),r.Image?(this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.rendererData.textures[r.Image]),this.gl.uniform1i(this.shaderProgramLocations.samplerUniform,0),this.gl.uniform1f(this.shaderProgramLocations.replaceableTypeUniform,0)):(r.ReplaceableId===1||r.ReplaceableId===2)&&(this.gl.uniform3fv(this.shaderProgramLocations.replaceableColorUniform,this.rendererData.teamColor),this.gl.uniform1f(this.shaderProgramLocations.replaceableTypeUniform,r.ReplaceableId)),e.Shading&Ee.NoDepthTest&&this.gl.disable(this.gl.DEPTH_TEST),e.Shading&Ee.NoDepthSet&&this.gl.depthMask(!1),this.gl.uniformMatrix3fv(this.shaderProgramLocations.tVertexAnimUniform,!1,this.getTexCoordMatrix(e))}setLayerPropsHD(e,i){const r=i[0],n=this.rendererData.materialLayerTextureID[e],o=this.rendererData.materialLayerNormalTextureID[e],s=this.rendererData.materialLayerOrmTextureID[e],a=n[0],f=this.model.Textures[a],l=(r==null?void 0:r.ShaderTypeId)===1?o[0]:n[1],u=this.model.Textures[l],g=(r==null?void 0:r.ShaderTypeId)===1?s[0]:n[2],S=this.model.Textures[g];if(r.Shading&Ee.TwoSided?this.gl.disable(this.gl.CULL_FACE):this.gl.enable(this.gl.CULL_FACE),r.FilterMode===z.Transparent?this.gl.uniform1f(this.shaderProgramLocations.discardAlphaLevelUniform,.75):this.gl.uniform1f(this.shaderProgramLocations.discardAlphaLevelUniform,0),r.FilterMode===z.None?(this.gl.disable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.depthMask(!0)):r.FilterMode===z.Transparent?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.depthMask(!0)):r.FilterMode===z.Blend?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.depthMask(!1)):r.FilterMode===z.Additive?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFunc(this.gl.SRC_COLOR,this.gl.ONE),this.gl.depthMask(!1)):r.FilterMode===z.AddAlpha?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE),this.gl.depthMask(!1)):r.FilterMode===z.Modulate?(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.ZERO,this.gl.SRC_COLOR,this.gl.ZERO,this.gl.ONE),this.gl.depthMask(!1)):r.FilterMode===z.Modulate2x&&(this.gl.enable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.blendFuncSeparate(this.gl.DST_COLOR,this.gl.SRC_COLOR,this.gl.ZERO,this.gl.ONE),this.gl.depthMask(!1)),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.rendererData.textures[f.Image]),this.gl.uniform1i(this.shaderProgramLocations.samplerUniform,0),r.Shading&Ee.NoDepthTest&&this.gl.disable(this.gl.DEPTH_TEST),r.Shading&Ee.NoDepthSet&&this.gl.depthMask(!1),typeof r.TVertexAnimId=="number"){const m=this.rendererData.model.TextureAnims[r.TVertexAnimId],T=this.interp.vec3(_t,m.Translation),b=this.interp.quat(Gt,m.Rotation),w=this.interp.vec3(It,m.Scaling);H.fromRotationTranslationScale(ge,b||Ot,T||Nt,w||kt),Ut.set(Pt,ge[0],ge[1],0,ge[4],ge[5],0,ge[12],ge[13],0),this.gl.uniformMatrix3fv(this.shaderProgramLocations.tVertexAnimUniform,!1,Pt)}else this.gl.uniformMatrix3fv(this.shaderProgramLocations.tVertexAnimUniform,!1,mr);this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.rendererData.textures[u.Image]),this.gl.uniform1i(this.shaderProgramLocations.normalSamplerUniform,1),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.rendererData.textures[S.Image]),this.gl.uniform1i(this.shaderProgramLocations.ormSamplerUniform,2),this.gl.uniform3fv(this.shaderProgramLocations.replaceableColorUniform,this.rendererData.teamColor)}}/*!
    dds-parser v1.0.1
	https://github.com/4eb0da/dds-parser
	Released under the MIT License.
*/var io=542327876,no=131072,oo=4,so=Dt("DXT1"),ao=Dt("DXT3"),lo=Dt("DXT5"),fo=Dt("ATI2"),ho=31,uo=0,co=1,go=2,mo=3,po=4,vo=7,xo=20,bo=21;function To(t){var e=new Int32Array(t,0,ho);if(e[uo]!==io)throw new Error("Invalid magic number in DDS header");if(!(e[xo]&oo))throw new Error("Unsupported format, must contain a FourCC code");var i,r,n=e[bo];switch(n){case so:i=8,r="dxt1";break;case ao:i=16,r="dxt3";break;case lo:i=16,r="dxt5";break;case fo:i=16,r="ati2";break;default:throw new Error("Unsupported FourCC code: "+Po(n))}var o=e[go],s=1;o&no&&(s=Math.max(1,e[vo]));for(var a=e[po],f=e[mo],l=e[co]+4,u=a,g=f,S=[],m,T=0;T<s;T++)m=Math.max(4,a)/4*Math.max(4,f)/4*i,S.push({offset:l,length:m,shape:{width:a,height:f}}),l+=m,a=Math.floor(a/2),f=Math.floor(f/2);return{shape:{width:u,height:g},images:S,format:r,flags:o}}function Dt(t){return t.charCodeAt(0)+(t.charCodeAt(1)<<8)+(t.charCodeAt(2)<<16)+(t.charCodeAt(3)<<24)}function Po(t){return String.fromCharCode(t&255,t>>8&255,t>>16&255,t>>24&255)}function Yt(t,e){return((1<<e)-1)/((1<<t)-1)}var So=Yt(4,8),Ne=Yt(5,8),Ct=Yt(6,8),lt=new Uint8Array(16),Oe=new Uint8Array(12),pr=new Uint8Array(8),vr=new Uint8Array(8),xr=new Uint8Array(8);function Eo(t,e,i){var r=(e>>11&31)*Ne,n=(e>>5&63)*Ct,o=(e&31)*Ne,s=(i>>11&31)*Ne,a=(i>>5&63)*Ct,f=(i&31)*Ne;t[0]=r,t[1]=n,t[2]=o,t[3]=255,t[4]=s,t[5]=a,t[6]=f,t[7]=255,e>i?(t[8]=5*r+3*s>>3,t[9]=5*n+3*a>>3,t[10]=5*o+3*f>>3,t[11]=255,t[12]=5*s+3*r>>3,t[13]=5*a+3*n>>3,t[14]=5*f+3*o>>3,t[15]=255):(t[8]=r+s>>1,t[9]=n+a>>1,t[10]=o+f>>1,t[11]=255,t[12]=0,t[13]=0,t[14]=0,t[15]=0)}function Br(t,e,i){var r=(e>>11&31)*Ne,n=(e>>5&63)*Ct,o=(e&31)*Ne,s=(i>>11&31)*Ne,a=(i>>5&63)*Ct,f=(i&31)*Ne;t[0]=r,t[1]=n,t[2]=o,t[3]=s,t[4]=a,t[5]=f,t[6]=5*r+3*s>>3,t[7]=5*n+3*a>>3,t[8]=5*o+3*f>>3,t[9]=5*s+3*r>>3,t[10]=5*a+3*n>>3,t[11]=5*f+3*o>>3}function Ao(t,e,i){t[0]=e,t[1]=i,e>i?(t[2]=54*e+9*i>>6,t[3]=45*e+18*i>>6,t[4]=36*e+27*i>>6,t[5]=27*e+36*i>>6,t[6]=18*e+45*i>>6,t[7]=9*e+54*i>>6):(t[2]=12*e+3*i>>4,t[3]=9*e+6*i>>4,t[4]=6*e+9*i>>4,t[5]=3*e+12*i>>4,t[6]=0,t[7]=255)}function br(t,e,i){t[0]=e,t[1]=i,e>i?(t[2]=(6*e+1*i)/7,t[3]=(5*e+2*i)/7,t[4]=(4*e+3*i)/7,t[5]=(3*e+4*i)/7,t[6]=(2*e+5*i)/7,t[7]=(1*e+6*i)/7):(t[2]=(4*e+1*i)/5,t[3]=(3*e+2*i)/5,t[4]=(2*e+3*i)/5,t[5]=(1*e+4*i)/5,t[6]=0,t[7]=1)}function Uo(t,e,i){for(var r=new Uint8Array(e*i*4),n=0,o=i/4;n<o;n++)for(var s=0,a=e/4;s<a;s++){var f=8*(n*a+s);Eo(lt,t[f]+256*t[f+1],t[f+2]+256*t[f+3]);for(var l=n*16*e+s*16,u=t[f+4]|t[f+5]<<8|t[f+6]<<16|t[f+7]<<24,g=0;g<4;g++)for(var S=g*8,m=l+g*e*4,T=0;T<4;T++){var b=m+T*4,w=(u>>S+T*2&3)*4;r[b+0]=lt[w+0],r[b+1]=lt[w+1],r[b+2]=lt[w+2],r[b+3]=lt[w+3]}}return r}function yo(t,e,i){for(var r=new Uint8Array(e*i*4),n=e*4,o=0,s=i/4;o<s;o++)for(var a=0,f=e/4;a<f;a++){var l=16*(o*f+a);Br(Oe,t[l+8]+256*t[l+9],t[l+10]+256*t[l+11]);for(var u=o*16*e+a*16,g=0;g<4;g++){for(var S=t[l+g*2]+256*t[l+1+g*2],m=t[l+12+g],T=0;T<4;T++){var b=u+T*4,w=(m>>T*2&3)*3;r[b+0]=Oe[w+0],r[b+1]=Oe[w+1],r[b+2]=Oe[w+2],r[b+3]=(S>>T*4&15)*So}u+=n}}return r}function Co(t,e,i){for(var r=new Uint8Array(e*i*4),n=e*4,o=0,s=i/4;o<s;o++)for(var a=0,f=e/4;a<f;a++){var l=16*(o*f+a);Ao(pr,t[l],t[l+1]),Br(Oe,t[l+8]+256*t[l+9],t[l+10]+256*t[l+11]);for(var u=o*16*e+a*16,g=0;g<2;g++)for(var S=l+2+g*3,m=l+12+g*2,T=t[S]+256*(t[S+1]+256*t[S+2]),b=0;b<2;b++){for(var w=t[m+b],c=0;c<4;c++){var v=u+c*4,h=(w>>c*2&3)*3,B=T>>b*12+c*3&7;r[v+0]=Oe[h+0],r[v+1]=Oe[h+1],r[v+2]=Oe[h+2],r[v+3]=pr[B]}u+=n}}return r}function Bo(t,e,i){for(var r=new Uint8Array(e*i*4),n=e*2,o=0,s=i/4;o<s;o++)for(var a=0,f=e/4;a<f;a++){var l=16*(o*f+a);br(vr,t[l],t[l+1]),br(xr,t[l+8],t[l+9]);for(var u=o*8*e+a*8,g=0;g<2;g++)for(var S=l+g*3,m=t[S+2]+256*(t[S+3]+256*t[S+4]),T=t[S+10]+256*(t[S+11]+256*t[S+12]),b=0;b<2;b++){for(var w=b*4,c=0;c<4;c++){var v=u+c*2,h=3*(w+c);r[v*2+0]=vr[m>>h&7],r[v*2+1]=xr[T>>h&7]}u+=n}}return r}function Do(t,e,i,r){if(e==="dxt1")return Uo(t,i,r);if(e==="dxt3")return yo(t,i,r);if(e==="dxt5")return Co(t,i,r);if(e==="ati2")return Bo(t,i,r);throw new Error("Unsupported format")}function Lo(t){const e=new DataView(t.buffer,t.byteOffset,t.byteLength),i=e.getUint8(0),r=e.getUint8(1),n=e.getUint8(2);if(r!==0)throw new Error("TGA colormap not supported");if(n!==2&&n!==10)throw new Error(`Unsupported TGA image type: ${n}`);const o=e.getUint16(12,!0),s=e.getUint16(14,!0),a=e.getUint8(16),f=e.getUint8(17);if(a!==24&&a!==32)throw new Error(`Unsupported TGA bpp: ${a}`);const l=(f&32)!==0;let u=18+i;const g=o*s,S=new Uint8ClampedArray(g*4),m=(T,b)=>{const w=t[T+0],c=t[T+1],v=t[T+2],h=a===32?t[T+3]:255;S[b+0]=v,S[b+1]=c,S[b+2]=w,S[b+3]=h};if(n===2){const T=a>>3;for(let b=0;b<g;b++){const w=u+b*T,c=b%o,v=b/o|0,B=((l?v:s-1-v)*o+c)*4;m(w,B)}}else{const T=a>>3;let b=0;for(;b<g;){const w=t[u++],c=(w&127)+1;if((w&128)!==0){const h=u;u+=T;for(let B=0;B<c;B++){const C=b%o,x=b/o|0,U=((l?x:s-1-x)*o+C)*4;m(h,U),b++}}else for(let h=0;h<c;h++){const B=u;u+=T;const C=b%o,x=b/o|0,U=((l?x:s-1-x)*o+C)*4;m(B,U),b++}}}return new ImageData(S,o,s)}const Fo=/^(?:.*\\|.*\/)?([^\\/]+)$/;function rt(t){return t.replace(/\\/g,"/")}function Mo(t,e,i){const r=rt(t),n=rt(r).toLowerCase(),o=i.byRelLower.get(n);if(o)return o;const s=rt(e).split("/").slice(0,-1).join("/"),a=(s?s+"/":"")+r,f=a.startsWith(rt(i.root))?rt(a).slice(rt(i.root).length+1):null;if(f){const u=i.byRelLower.get(f.toLowerCase());if(u)return u}const l=r.replace(Fo,"$1").toLowerCase();return i.byBaseLower.get(l)||null}async function Vo(t,e,i,r,n){const o=i.toLowerCase();if(o.endsWith(".blp")){const f=en(r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength)),l=f.mipmaps.map((u,g)=>tn(f,g));t.setTextureImageData(e,l);return}if(o.endsWith(".dds")){const f=r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength),l=To(f);let u;if(n.hasGPUBC&&(l.format==="dxt1"?u="bc1-rgba-unorm":l.format==="dxt3"?u="bc2-rgba-unorm":l.format==="dxt5"?u="bc3-rgba-unorm":l.format==="ati2"&&(u="bc5-rg-unorm")),u&&t.setGPUTextureCompressedImage){t.setGPUTextureCompressedImage(e,u,f,l);return}const g=new Uint8Array(f),S=l.images.filter(m=>m.shape.width>0&&m.shape.height>0).map(m=>{const T=g.slice(m.offset,m.offset+m.length),b=Do(T,l.format,m.shape.width,m.shape.height);return new ImageData(new Uint8ClampedArray(b),m.shape.width,m.shape.height)});t.setTextureImageData(e,S);return}if(o.endsWith(".tga")){const f=Lo(r);t.setTextureImageData(e,[f]);return}const s=new Blob([r]),a=URL.createObjectURL(s);try{const f=new Image;await new Promise((l,u)=>{f.onload=()=>l(),f.onerror=()=>u(new Error("Image decode failed")),f.src=a}),t.setTextureImage(e,f)}finally{URL.revokeObjectURL(a)}}const Tr=H.create(),Pr=H.create(),Xt=d.create(),Ro=d.fromValues(0,0,1),$e=d.create(),St=d.create(),ft=d.create(),Sr=ue.create(),wo=d.fromValues(1,0,0);function _o(t,e){d.set(ft,t[0],t[1],0),d.subtract(St,t,e),d.normalize(ft,ft),d.normalize(St,St);const i=ue.create();return ue.rotationTo(i,wo,ft),ue.rotationTo(Sr,ft,St),ue.mul(i,Sr,i),i}async function Go(){if(!navigator.gpu)throw new Error("WebGPU not available. Update Electron/Chrome or enable WebGPU.");const t=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!t)throw new Error("Failed to request WebGPU adapter");const e=t.features.has("texture-compression-bc"),i=await t.requestDevice({requiredFeatures:e?["texture-compression-bc"]:[]}),r=navigator.gpu.getPreferredCanvasFormat();return{device:i,format:r,hasGPUBC:e}}class Io{constructor(e,i,r,n,o){this.modelAbs=e,this.idx=i,this.gpu=r,this.readFile=n,this.getSettings=o,this.visible=!1,this.loaded=!1,this.loading=!1,this.renderer=null,this.model=null,this.lastTime=0,this.theta=0,this.cameraDistance=600,this.center=d.create(),this.el=document.createElement("div"),this.el.className="tile",this.canvas=document.createElement("canvas"),this.canvas.className="canvas",this.el.appendChild(this.canvas);const s=document.createElement("div");s.className="hint",s.textContent="Loading...",this.el.appendChild(s);const a=document.createElement("div");a.className="meta",this.labelEl=document.createElement("span"),this.labelEl.className="name",this.labelEl.textContent=e.split(/[\\/]/).pop()||e,this.badgeEl=document.createElement("span"),this.badgeEl.className="badge",this.badgeEl.textContent="…",a.appendChild(this.labelEl),a.appendChild(this.badgeEl),this.el.appendChild(a)}setSize(e){const i=window.devicePixelRatio||1;this.canvas.style.width=`${e}px`,this.canvas.style.height=`${e}px`,this.canvas.width=Math.max(1,Math.floor(e*i)),this.canvas.height=Math.max(1,Math.floor(e*i))}async load(){var e;if(!(this.loaded||this.loading)){this.loading=!0;try{const i=await this.readFile(this.modelAbs),r=this.modelAbs.toLowerCase();let n;if(r.endsWith(".mdx")){const l=i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength);n=Ki(l)}else{const l=new TextDecoder("utf-8",{fatal:!1}).decode(i);n=mi(l)}this.model=n,this.badgeEl.textContent=n.Version>=1100?"HD":"SD",this.computeCamera(n);const o=this.canvas.getContext("webgpu");if(!o)throw new Error("Failed to create WebGPU context");o.configure({device:this.gpu.device,format:this.gpu.format,alphaMode:"premultiplied"});const s=new ro(n),a=this.getSettings();s.setEffectsEnabled({particles:a.particles,ribbons:a.ribbons}),s.setTeamColor(d.fromValues(1,0,0)),(e=n.Sequences)!=null&&e.length&&s.setSequence(0),await s.initGPUDevice(this.canvas,this.gpu.device,o),await this.loadTextures(n,s);const f=this.el.querySelector(".hint");f&&f.remove(),this.renderer=s,this.loaded=!0}catch(i){const r=this.el.querySelector(".hint");r&&(r.textContent=`Error: ${(i==null?void 0:i.message)||i}`),console.error(i)}finally{this.loading=!1}}}computeCamera(e){const i=e.Info;if(i!=null&&i.MinimumExtent&&(i!=null&&i.MaximumExtent)){const r=i.MinimumExtent,n=i.MaximumExtent;d.set(this.center,(r[0]+n[0])/2,(r[1]+n[1])/2,(r[2]+n[2])/2);const o=i.BoundsRadius||Math.max(10,d.distance(d.fromValues(r[0],r[1],r[2]),d.fromValues(n[0],n[1],n[2]))/2);this.cameraDistance=Math.max(120,o*2.6)}else d.set(this.center,0,0,0),this.cameraDistance=600}async loadTextures(e,i){const r={hasGPUBC:this.gpu.hasGPUBC},n=[];for(const o of e.Textures||[]){if(!(o!=null&&o.Image))continue;const s=Mo(o.Image,this.modelAbs,this.idx);s&&n.push((async()=>{try{const a=await this.readFile(s);await Vo(i,o.Image,s,a,r)}catch{}})())}await Promise.all(n)}tick(e){var l;if(!this.visible||!this.loaded||!this.renderer||!this.model)return;const i=this.getSettings();if(this.renderer.setEffectsEnabled({particles:i.particles,ribbons:i.ribbons}),this.lastTime&&e-this.lastTime<66)return;const r=this.lastTime?e-this.lastTime:16;this.lastTime=e,i.rotate&&(this.theta+=r*7e-4);const n=this.canvas.width/this.canvas.height;H.perspective(Tr,Math.PI/4,n,.1,5e4);const o=this.cameraDistance,s=this.center[2];d.set($e,this.center[0]+Math.cos(this.theta)*o,this.center[1]+Math.sin(this.theta)*o,s+o*.35),d.copy(Xt,this.center),H.lookAt(Pr,$e,Xt,Ro);const a=_o($e,Xt);this.renderer.setCamera($e,a);const f=d.fromValues($e[0]+o*.5,$e[1]-o*.3,$e[2]+o*.8);this.renderer.setLightPosition(f),this.renderer.setLightColor(d.fromValues(1,1,1)),i.animate&&((l=this.model.Sequences)!=null&&l.length)&&this.renderer.update(r),this.renderer.render(Pr,Tr,{wireframe:!1,env:!1,useEnvironmentMap:!1,levelOfDetail:0})}}class No{constructor(e,i,r,n){this.grid=e,this.statusEl=i,this.readFile=r,this.getSettings=n,this.folder=null,this.idx=null,this.gpu=null,this.tiles=[],this.tileMap=new Map,this.loadingQueue=[],this.loadingCount=0,this.loop=o=>{for(const s of this.tiles)s.tick(o);requestAnimationFrame(this.loop)},this.observer=new IntersectionObserver(o=>{for(const s of o){const a=this.tileMap.get(s.target);a&&(a.visible=s.isIntersecting,a.visible&&this.enqueueLoad(a))}},{root:null,threshold:.05}),requestAnimationFrame(this.loop)}async setFolder(e){this.folder=e,this.gpu||(this.status("初始化 WebGPU..."),this.gpu=await Go()),this.idx=this.buildIndex(e),this.renderTiles()}refresh(){!this.folder||!this.idx||!this.gpu||this.renderTiles()}buildIndex(e){const i=new Map,r=new Map;for(const n of e.files)i.set(n.rel.toLowerCase(),n.abs),r.set(n.base.toLowerCase(),n.abs);return{root:e.root,byRelLower:i,byBaseLower:r}}status(e){this.statusEl.textContent=e}renderTiles(){const e=this.getSettings(),i=this.folder,r=this.idx,n=this.gpu,o=(e.filter||"").trim().toLowerCase(),s=i.models.slice().sort(),a=o?s.filter(l=>l.toLowerCase().includes(o)):s,f=a.slice(0,Math.max(1,e.limit));this.grid.style.setProperty("--tile",`${e.tileSize}px`),this.grid.innerHTML="",this.tiles=[],this.tileMap.clear(),this.loadingQueue=[],this.loadingCount=0;for(const l of f){const u=new Io(l,r,n,this.readFile,this.getSettings);u.setSize(e.tileSize),this.tiles.push(u),this.tileMap.set(u.el,u),this.grid.appendChild(u.el),this.observer.observe(u.el)}this.status(`模型: ${a.length}  | 显示: ${f.length}`)}enqueueLoad(e){e.loaded||e.loading||(this.loadingQueue.push(e),this.pumpQueue())}pumpQueue(){for(;this.loadingCount<3&&this.loadingQueue.length;){const e=this.loadingQueue.shift();e.loaded||e.loading||(this.loadingCount++,e.load().finally(()=>{this.loadingCount--,this.pumpQueue()}))}}}const Oo=document.getElementById("btnPick"),Kt=document.getElementById("inpLimit"),$t=document.getElementById("selSize"),jt=document.getElementById("togAnim"),Zt=document.getElementById("togRotate"),Qt=document.getElementById("togParticles"),Jt=document.getElementById("togRibbons"),ct=document.getElementById("status"),er=document.getElementById("inpFilter"),ko=document.getElementById("grid");if(!window.war3Desktop)throw ct.textContent="Electron preload not found",new Error("Electron preload not found");const Ie={tileSize:parseInt($t.value,10),limit:parseInt(Kt.value,10),filter:er.value,animate:jt.checked,rotate:Zt.checked,particles:Qt.checked,ribbons:Jt.checked};function Xo(){return Ie.tileSize=parseInt($t.value,10),Ie.limit=Math.max(1,parseInt(Kt.value,10)||1),Ie.filter=er.value||"",Ie.animate=jt.checked,Ie.rotate=Zt.checked,Ie.particles=Qt.checked,Ie.ribbons=Jt.checked,Ie}const Ho=async t=>{const e=await window.war3Desktop.readFile(t);return e instanceof Uint8Array?e:new Uint8Array(e)},Dr=new No(ko,ct,Ho,Xo);Oo.addEventListener("click",async()=>{try{ct.textContent="选择文件夹...";const t=await window.war3Desktop.selectFolder();if(!t){ct.textContent="取消";return}await Dr.setFolder(t)}catch(t){console.error(t),ct.textContent=`错误: ${(t==null?void 0:t.message)||t}`}});function tr(){Dr.refresh()}Kt.addEventListener("change",tr);$t.addEventListener("change",tr);jt.addEventListener("change",()=>{});Zt.addEventListener("change",()=>{});Qt.addEventListener("change",()=>{});Jt.addEventListener("change",()=>{});let Et=null;er.addEventListener("input",()=>{Et&&window.clearTimeout(Et),Et=window.setTimeout(()=>{tr(),Et=null},200)});
