<template>
  <div class="expert-personal" v-loading="isGetInfoing">
    <SpecialityDialog ref="specialityRef" @displaySpecialiity="displaySpecialiity" />
    <div class="personal-wrapper">
      <div class="personal-top">
        <div style="color: rgb(0, 91, 172);font-size:14px;">个人信息维护</div>
        <div>
          <!-- 审核状态 14:保存 0:注册 2:撤回 12:不通过 10：通过-->
          <el-button type="primary" v-if="shzt==='0'" @click="toSubmitAll('2')">撤回</el-button>
          <div v-else-if="shzt==='14' || shzt==='12' || shzt!=='10'">
            <el-button type="primary" plain @click="toSubmitAll('14')">全部保存</el-button>
            <el-button type="primary" @click="toSubmitAll('0')">提交</el-button>
          </div>
        </div>
      </div>
      <el-form :model="personalForm" label-width="190px" ref="personalForm" :rules="personalFormRules" :disabled="shzt==='10' || shzt==='0'">
        <div class="basic-info info-wrapper">
          <div class="info-top">
            <div class="info-top-text">基本信息</div>
          </div>
          <div class="info-main">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名：" prop="zjname">
                  <el-input v-model="personalForm.zjname" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别：" prop="sex">
                  <el-select v-model="personalForm.sex" size="small">
                    <el-option key="nan" label="男" value="1"></el-option>
                    <el-option key="nv" label="女" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="证件类型：" prop="papertype">
                  <el-select v-model="personalForm.papertype" size="small">
                    <el-option label="居民身份证" value="01"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件号：" prop="papernumber">
                  <el-input v-model="personalForm.papernumber" size="small" @change="onIdChange"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="出生日期：" prop="shengri">
                  <el-date-picker
                    disabled
                    v-model="personalForm.shengri"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择出生日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年龄：" prop="age">
                  <el-input v-model="personalForm.age" size="small" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="通讯地址：" prop="sfcode">
                  <el-select v-model="personalForm.sfcode" placeholder="省" @change="onProvinceChange">
                    <el-option
                      v-for="province in provinceData"
                      :key="province.code"
                      :label="province.regionname"
                      :value="province.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item prop="cscode" label-width="0px">
                  <el-select v-model="personalForm.cscode" placeholder="市">
                    <!-- <el-option value="" label="请选择"></el-option> -->
                    <el-option
                      v-for="city in cityData"
                      :key="city.code"
                      :label="city.regionname"
                      :value="city.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label-width="0" prop="adress">
                  <el-input v-model="personalForm.adress" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="手机号码：" prop="cellnum">
                  <el-input v-model="personalForm.cellnum" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办公电话：" prop="landlinenum">
                  <el-input v-model="personalForm.landlinenum" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="邮箱：" prop="email">
                  <el-input v-model="personalForm.email" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族：" prop="minzu">
                  <el-input v-model="personalForm.minzu" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="邮编：" prop="youbian">
                  <el-input v-model="personalForm.youbian" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="籍贯：" prop="jiguan">
                  <el-input v-model="personalForm.jiguan" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="job-info info-wrapper">
          <div class="info-top">
            <div class="info-top-text">专业职称</div>
          </div>
          <div class="info-main">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="毕业院校：" prop="school">
                  <el-input v-model="personalForm.school" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所学专业：" prop="zhuanye">
                  <el-input v-model="personalForm.zhuanye" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="最高学历：" prop="maxxueli">
                  <el-input v-model="personalForm.maxxueli" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最高学位：" prop="maxxuewei">
                  <el-input v-model="personalForm.maxxuewei" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="工作单位：" prop="gzdw">
                  <el-input v-model="personalForm.gzdw" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="参加工作时间：" prop="gzbegintime">
                  <el-date-picker
                    v-model="personalForm.gzbegintime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择参加工作日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="工作部门：" prop="gzbm">
                  <el-input v-model="personalForm.gzbm" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="现任岗位（职务）：" prop="zhiwu">
                  <el-input v-model="personalForm.zhiwu" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否华电系统内专家：" prop="isinsystem">
                  <el-select v-model="personalForm.isinsystem" size="small">
                    <el-option label="系统内" value="0"></el-option>
                    <el-option label="系统外" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="现任职级：" prop="zhiji">
                  <el-select v-model="personalForm.zhiji" placeholder="现任职级">
                    <el-option
                      v-for="zhiji in zhijiList"
                      :key="zhiji.key"
                      :label="zhiji.value"
                      :value="zhiji.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="职称名称：" prop="zhicheng">
                  <el-select v-model="personalForm.zhicheng" placeholder="现任职称" @change="onChangeZhicheng">
                    <el-option
                      v-for="zhicheng in zhichengList"
                      :key="zhicheng.key"
                      :label="zhicheng.value"
                      :value="zhicheng.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职称等级：" prop="zyzgdjStr">
                  <el-input v-model="personalForm.zyzgdjStr" size="small" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否在职：" prop="isonjob">
                  <!-- <el-input v-model="personalForm.isonjob" size="small"></el-input> -->
                  <el-select v-model="personalForm.isonjob" placeholder="请选择是否在职">
                    <el-option label="在职" value="0"></el-option>
                    <el-option label="不在职" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专业技术资格证书编号：" prop="zhengshunumber">
                  <el-input v-model="personalForm.zhengshunumber" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="资格开始时间：" prop="zigebegintime">
                  <el-date-picker
                    v-model="personalForm.zigebegintime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择资格开始时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="从业年限：" prop="workyear">
                  <el-input v-model="personalForm.workyear" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="推荐单位：" prop="tjdwmc">
                  <el-input v-model="personalForm.tjdwmc" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所学专业：" prop="zhuanye">
                  <el-input v-model="personalForm.zhuanye" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="personalForm.rkzt !== '1'">
              <el-col :span="8">
                <el-form-item label="申报专业(可多选)：" prop="zyids">
                  <el-button type="primary" plain @click="toSelectSpeciality">维护专业信息</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="已选专业：">
                  <div v-for="(item) in checkedSpecialityList" :key="item.id" style="color:#606266">{{ item.way }}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col>
                <el-form-item label="申报专业：" prop="zyids">
                  <div v-for="item in yxzymcListData" :key="item.zyflpkid" style="color:#606266">{{ item.way }}<span v-if="item.star"> {{ item.star }}星</span></div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="job-info info-wrapper">
          <div class="info-top">
            <div class="info-top-text">证书附件</div>
          </div>
          <div class="info-main">
            <div class="file-tip" style="margin-top: 12px;">注：附件文件支持格式含.jpg .jpeg .png .rar .zip .doc .docx .pdf，单个文件不能超过5MB。</div>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="照片：" prop="zpfile" class="bidexpert-file-no-delete">
                  <el-upload
                    ref="zpfile"
                    action="#"
                    :auto-upload="false"
                    :file-list="filesData.zpFile"
                    :limit="1"
                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt,.rar,.zip"
                    :on-preview="onPreviewFile"
                    :on-change="(f, fl) => onChangeFile(f, fl, 'zpfile')"
                    :on-exceed="(f, fl) => onFileExceed(f, fl, 'zpfile')">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <!-- <span slot="tip" class="el-upload__tip" style="margin-left: 10px;">只能上传jpg/png文件</span>   -->
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证复印件：" prop="sfzfile" class="bidexpert-file-no-delete">
                  <el-upload
                    ref="sfzfile"
                    action="#"
                    :auto-upload="false"
                    :file-list="filesData.sfzFile"
                    :limit="1"
                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt,.rar,.zip"
                    :on-preview="onPreviewFile"
                    :on-change="(f, fl) => onChangeFile(f, fl, 'sfzfile')"
                    :on-exceed="(f, fl) => onFileExceed(f, fl, 'sfzfile')">
                    <el-button size="small" type="primary" slot="trigger">上传图片</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="职称证：" prop="gzfile" class="bidexpert-file-no-delete">
                  <el-upload
                    ref="gzfile"
                    action="#"
                    :auto-upload="false"
                    :file-list="filesData.gzFile"
                    :limit="1"
                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt,.rar,.zip"
                    :on-preview="onPreviewFile"
                    :on-change="(f, fl) => onChangeFile(f, fl, 'gzfile')"
                    :on-exceed="(f, fl) => onFileExceed(f, fl, 'gzfile')">
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学历：" prop="xlfile" class="bidexpert-file-no-delete">
                  <el-upload
                    ref="xlfile"
                    action="#"
                    :auto-upload="false"
                    :file-list="filesData.xlFile"
                    :limit="1"
                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt,.rar,.zip"
                    :on-preview="onPreviewFile"
                    :on-change="(f, fl) => onChangeFile(f, fl, 'xlfile')"
                    :on-exceed="(f, fl) => onFileExceed(f, fl, 'xlfile')">
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="手签签名：" prop="sqqmfile" class="bidexpert-file-no-delete">
                  <el-upload
                    ref="sqqmfile"
                    action="#"
                    :auto-upload="false"
                    :file-list="filesData.sqqmFile"
                    :limit="1"
                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt,.rar,.zip"
                    :on-preview="onPreviewFile"
                    :on-change="(f, fl) => onChangeFile(f, fl, 'sqqmfile')"
                    :on-exceed="(f, fl) => onFileExceed(f, fl, 'sqqmfile')">
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="expert-other-annex">
              <div class="file-tip" style="margin-top: 6px;">注：支持上传多个其他附件。</div>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="其他附件：" prop="qtfjfile">
                    <el-upload
                      ref="qtfjfile"
                      action="#"
                      :auto-upload="false"
                      :file-list="filesData.qtfjFileList"
                      :on-remove="onOtherFileRemove"
                      :on-preview="onPreviewFile"
                      :on-change="(f, fl) => onChangeFile(f, fl, 'qtfjfile')"
                      accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt,.rar,.zip"
                      multiple>
                      <el-button size="small" type="primary">上传文件</el-button>
                      <!-- <span slot="tip" class="el-upload__tip" style="margin-left: 10px;">总大小不能超过5M,如果超过5M请压缩格式或分多次保存</span> -->
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="job-info info-wrapper">
          <div class="info-top">
            <div class="info-top-text">学习简历</div>
          </div>
          <div class="info-main" style="padding: 0 30px 30px;">
            <el-table :data="learnInfoArr">
              <el-table-column
                label="学校"
                prop="school"
                align="center">
                <template slot-scope="scope">
                  <div><el-input v-model="scope.row.school"></el-input></div>
                </template>
              </el-table-column>
              <el-table-column
                label="学历"
                prop="xueli"
                align="center">
                <template slot-scope="scope">
                  <div><el-input v-model="scope.row.xueli"></el-input></div>
                </template>
              </el-table-column>
              <el-table-column
                label="起始时间"
                width="230px"
                align="center">
                <template slot-scope="scope">
                  <div>
                    <el-date-picker
                      type="date"
                      v-model="scope.row.begintime"
                      placeholder="选择开始时间"
                      :picker-options="{
                        disabledDate: choiceDate => {
                          const nowTamp = new Date().getTime();
                          const choiceTamp = choiceDate.getTime();
                          if (scope.row.endtime) {
                            const endTamp = new Date(scope.row.endtime).getTime();
                            return choiceTamp > endTamp || choiceTamp > nowTamp;
                          } else {
                            return choiceTamp > nowTamp;
                          }
                        }
                      }">
                    </el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="结束时间"
                width="230px"
                align="center">
                <template slot-scope="scope">
                  <div>
                    <el-date-picker
                      type="date"
                      v-model="scope.row.endtime"
                      placeholder="选择结束时间"
                      :picker-options="{
                        disabledDate: choiceDate => {
                          const nowTamp = new Date().getTime();
                          const choiceTamp = choiceDate.getTime();
                          if (scope.row.begintime) {
                            const startTamp = new Date(scope.row.begintime).getTime();
                            return choiceTamp < startTamp || choiceTamp > nowTamp;
                          } else {
                            return choiceTamp > nowTamp;
                          }
                        }
                      }">
                    </el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100px"
                align="center">
                <template slot-scope="scope">
                  <div>
                    <el-button type="text" @click="deleteRow(scope, 'learnInfoArr')">清空</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="expert-edit-operate">
              <el-button type="primary" plain icon='el-icon-plus' round @click="toAddRow('learnInfoArr')">学习经历</el-button>
            </div>
          </div>
        </div>
        <div class="job-info info-wrapper">
          <div class="info-top">
            <div class="info-top-text">工作简历</div>
          </div>
          <div class="info-main" style="padding: 0 30px 30px;">
            <el-table :data="workInfoArr">
              <el-table-column
                label="工作单位"
                prop="gzdw"
                align="center">
                <template slot-scope="scope">
                  <div><el-input v-model="scope.row.gzdw" size="small"></el-input></div>
                </template>
              </el-table-column>
              <el-table-column
                label="岗位/职务"
                prop="zhiwu"
                align="center">
                <template slot-scope="scope">
                  <div><el-input v-model="scope.row.zhiwu" size="small"></el-input></div>
                </template>
              </el-table-column>
              <el-table-column
                label="起始时间"
                width="230px"
                align="center">
                <template slot-scope="scope">
                  <div>
                    <el-date-picker
                      type="date"
                      v-model="scope.row.begintime"
                      placeholder="选择开始时间"
                      :picker-options="{
                        disabledDate: choiceDate => {
                          const nowTamp = new Date().getTime();
                          const choiceTamp = choiceDate.getTime();
                          if (scope.row.begintime) {
                            const endTamp = new Date(scope.row.begintime).getTime();
                            return choiceTamp > endTamp || choiceTamp > nowTamp;
                          } else {
                            return choiceTamp > nowTamp;
                          }
                        }
                      }">
                    </el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="结束时间"
                width="230px"
                align="center">
                <template slot-scope="scope">
                  <div>
                    <el-date-picker
                      type="date"
                      v-model="scope.row.endtime"
                      placeholder="选择结束时间"
                      :picker-options="{
                        disabledDate: choiceDate => {
                          const nowTamp = new Date().getTime();
                          const choiceTamp = choiceDate.getTime();
                          if (scope.row.endtime) {
                            const startTamp = new Date(scope.row.endtime).getTime();
                            return choiceTamp < startTamp || choiceTamp > nowTamp;
                          } else {
                            return choiceTamp > nowTamp;
                          }
                        }
                      }">
                    </el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100px"
                align="center">
                <template slot-scope="scope">
                  <div>
                    <el-button type="text" @click="deleteRow(scope, 'workInfoArr')">清空</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="expert-edit-operate">
              <el-button type="primary" plain icon='el-icon-plus' round @click="toAddRow('workInfoArr')">工作经历</el-button>
            </div>
          </div>
        </div>
        <div class="job-info info-wrapper">
          <div class="info-top">
            <div class="info-top-text">主要业绩</div>
          </div>
          <div class="info-main" style="padding: 0 30px 30px;">
            <el-table :data="performanceInfoArr">
              <el-table-column
                label="完成时间"
                prop="usertimestr"
                width="230px"
                align="center">
                <template slot-scope="scope">
                  <div>
                    <el-date-picker
                      type="date"
                      v-model="scope.row.usertimestr"
                      placeholder="选择开始时间"
                      :picker-options="{
                        disabledDate: choiceDate => {
                          const nowTamp = new Date().getTime();
                          const choiceTamp = choiceDate.getTime();
                          return choiceTamp > nowTamp;
                        }
                      }">
                    </el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="承担角色"
                prop="workrole"
                align="center">
                <template slot-scope="scope">
                  <div>
                    <el-input v-model="scope.row.workrole" size="small"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="工作内容"
                prop="workcontent"
                align="center">
                <template slot-scope="scope">
                  <div>
                    <el-input v-model="scope.row.workcontent" size="small"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100px"
                align="center">
                <template slot-scope="scope">
                  <div>
                    <el-button type="text" @click="deleteRow(scope, 'performanceInfoArr')">清空</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="expert-edit-operate">
              <el-button type="primary" plain icon='el-icon-plus' round @click="toAddRow('performanceInfoArr')">主要业绩</el-button>
            </div>
          </div>
        </div>
      </el-form>
      <div class="personal-bottom">
        <div>
          <el-button type="primary" v-if="shzt==='0'" @click="toSubmitAll('2')">撤回</el-button>
          <div v-else-if="shzt==='14' || shzt==='12' || shzt!=='10'">
            <el-button type="primary" plain @click="toSubmitAll('14')">全部保存</el-button>
            <el-button type="primary" @click="toSubmitAll('0')">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  registerTpzzjbTo,
  registerTpzzjb,
  deleteQtFj
} from '@/api/registerApi.js';
import {
  selectRegionListByCode
} from '@/api/commonApi.js';
import listData from './listData.js';
import expertFormConfig from './expertFormConfig.js';
import SpecialityDialog from './specialityDialog.vue';
export default {
  data() {
    return {
      personalForm: expertFormConfig.form,
      personalFormRules: expertFormConfig.rules,
      learnInfoArr: [],
      deletexlids: [],
      workInfoArr: [],
      deletegzjlids: [],
      performanceInfoArr: [],
      deletegzyjids: [],
      isGetInfoing: false,
      zhichengList: listData.zhichengList,
      zhijiList: listData.zhijiList,
      provinceData: [],
      cityData: [],
      yxzymcListData: [],//申报专业
      checkedSpecialityList: [],
      checkedKeys: [],
      filesData: {//回显附件数据
        gzFile: [],
        qtfjFileList: [],
        sfzFile: [],
        sqqmFile: [],
        txpath: [],
        xlFile: [],
        zpFile: []
      },
      shzt: ''
    }
  },
  components: {
    SpecialityDialog
  },
  created() {
    this.getRegionList();
    this.getInfoTo();
  },
  methods: {
    // 删除其他附件
    onOtherFileRemove(f, fl) {
      const {
        fileid
      } = f;
      const {
        phone
      } = this.$route.query;
      deleteQtFj.bind(this)({
        fileid,
        phone
      }).then(res => {
        this.$message.success('删除成功')
      }).catch(rej => {
        if (rej.header && rej.header.ret === 1) {
          this.$message({
            type: "error",
            showClose: true,
            message: rej.header.msg
          });
        } else {
          console.log(rej)
        }
      })
    },
    // 根据身份证号计算生日和年龄
    onIdChange(val) {
      this.$refs.personalForm.validateField('papernumber', (msg) => {
        if (msg) {
          return false;
        }
        let idCardLength = val.length;
        let strIDno = val.replace(/x$/i,"a");
        if (idCardLength==18) {    
          let sBirthday = strIDno.substr(6,4)+"-"+Number(strIDno.substr(10,2))+"-"+Number(strIDno.substr(12,2));
          let d = new Date(sBirthday.replace(/-/g,"/"));
          this.personalForm.shengri = sBirthday;
          this.personalForm.age = new Date().getFullYear() - d.getFullYear();
        } else if (idCardLength==15) {
          let sBirthday = "19" + strIDno.substr(6,2) + "-" + Number(strIDno.substr(8,2)) + "-" + Number(strIDno.substr(10,2));
          let d = new Date(sBirthday.replace(/-/g,"/"));
          this.personalForm.shengri = sBirthday;
          this.personalForm.age = new Date().getFullYear() - d.getFullYear();
        }
      })
    },
    onChangeZhicheng(val) {
      if (['1','2','3','4','5','6'].indexOf(val) > -1) {
        this.personalForm.zyzgdjStr = '高级以上';
        this.personalForm.zyzgdj = '1';
      } else if (['7','8','9','10','11','12','13','14','15'].indexOf(val) > -1) {
        this.personalForm.zyzgdjStr = '高级';
        this.personalForm.zyzgdj = '2';
      } else if (['16','17','18','19'].indexOf(val) > -1) {
        this.personalForm.zyzgdjStr = '中级';
        this.personalForm.zyzgdj = '3';
      } else {
        this.personalForm.zyzgdjStr = '';
        this.personalForm.zyzgdj = '';
      }
    },
    toSelectSpeciality() {
      const {
        checkedSpecialityList
      } = this;
      this.$refs.specialityRef.show(checkedSpecialityList)
    },
    displaySpecialiity(data, keys) {
      this.checkedSpecialityList = data;
      this.checkedKeys = keys;
      this.$set(this.personalForm, 'zyids', this.checkedKeys.join(','));
    },
    toSubmitAll(type) {
      console.log('type:',type);
      const {
        personalForm,
        learnInfoArr,
        workInfoArr,
        performanceInfoArr,
        deletexlids,
        deletegzjlids,
        deletegzyjids
      } = this;
      const expertFormData = new FormData();
      // 操作类型
      expertFormData.set('shzt', type);
      // 撤回
      if (type === '2') {
        const {
          cellnum
        } = personalForm;
        expertFormData.set('cellnum', cellnum);
        this.submitAll('2', expertFormData);
        return;
      } 
      // 表单信息
      Object.keys(personalForm).forEach(key => {
        if (key === 'shzt') {
          return;
        }
        if (['zpfile', 'sfzfile', 'gzfile', 'xlfile', 'sqqmfile', 'qtfjfile'].indexOf(key) > -1) {
          personalForm[key].forEach(file => {
            expertFormData.append(key, file.raw);
          })
        } else {
          expertFormData.set(key, personalForm[key]);
        }
      });
      // 学习简历 工作简历 主要业绩
      expertFormData.set('learnInfoArr', JSON.stringify(learnInfoArr));
      expertFormData.set('workInfoArr', JSON.stringify(workInfoArr));
      expertFormData.set('performanceInfoArr', JSON.stringify(performanceInfoArr));
      // 学习简历 工作简历 主要业绩删除的数据
      expertFormData.set('deletexlids', deletexlids.join(','));
      expertFormData.set('deletegzjlids', deletegzjlids.join(','));
      expertFormData.set('deletegzyjids', deletegzyjids.join(','));

      // for (let pair of expertFormData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }

      // 保存
      if (type === '14') {
        this.submitAll('14', expertFormData);
      }
      // 提交
      else if (type === '0') {
        this.$refs.personalForm.validate(valid => {
          if (!valid) {
            return false;
          }
          this.submitAll('0', expertFormData);
        })
      }
    },
    submitAll(type, expertFormData) {
      registerTpzzjb.bind(this)(expertFormData, 'isSaving').then(res => {
        // 审核状态  14:保存  0:注册  2:撤回
        if (type === '14') {
          this.$message({
            type: "success",
            showClose: true,
            message: '保存成功'
          });
          this.getInfoTo();
        } else if (type === '0') {
          this.$message({
            type: "success",
            showClose: true,
            message: '提交成功'
          });
          // this.getInfoTo();
          this.$router.push({
            name: 'registerResult',
            query: {
              phone: res.data
            }
          });
        } else {
          this.$message({
            type: "success",
            showClose: true,
            message: '撤回成功'
          });
          this.getInfoTo();
        }
      }).catch(rej => {
        if (rej.header && rej.header.ret === 1) {
          this.$message({
            type: "error",
            showClose: true,
            message: rej.header.msg
          });
        } else {
          console.log(rej)
        }
      })
    },
    toAddRow(tableData) {
      if (tableData === 'learnInfoArr') {
        this[tableData].push({
          school: '',
          xueli: '',
          begintime: '',
          endtime: ''
        });
      } else if (tableData === 'workInfoArr') {
        this[tableData].push({
          gzdw: '',
          zhiwu: '',
          gzjlbegintime: '',
          gzjlendtime: ''
        });
      } else if (tableData === 'performanceInfoArr') {
        this[tableData].push({
          usertimestr: '',
          workcontent: '',
          workrole: ''
        });
      }
    },
    // 清空操作
    deleteRow(scope, tableData) {
      let {
        $index
      } = scope;
      // 更新删除数据
      const {
        id
      } = scope.row;
      // 清空
      this[tableData].splice($index, 1);
      if (!id) return;
      if (tableData === 'learnInfoArr') {
        this.deletexlids.push(id)
      } else if (tableData === 'workInfoArr') {
        this.deletegzjlids.push(id)
      } else if (tableData === 'performanceInfoArr') {
        this.deletegzyjids.push(id)
      }
    },
    changeRow(scope, listName) {
      const topRow = this[listName][scope.$index-1];
      const row = scope.row;
      this.$set(this[listName], scope.$index-1, JSON.parse(JSON.stringify(row)));
      this.$set(this[listName], scope.$index, JSON.parse(JSON.stringify(topRow)));
    },
    // 编辑记录
    editRow(scope, refName) {
      this[refName] = JSON.parse(JSON.stringify(scope.row));
    },
    // 重置表格
    toClearForm(refName) {
      this.$refs[refName].resetFields();
    },
    // 注册信息回显
    getInfoTo() {
      // 清空删除数据
      this.deletexlids = [];
      this.deletegzjlids = [];
      this.deletegzyjids = [];
      const {
        phone
      } = this.$route.query;
      registerTpzzjbTo.bind(this)({
        phone
      }, 'isGetInfoing').then(res => {
        if (!res.data) {
          return false;
        }
        const {
          tpzjjb,
          fileListDto,
          xlxxList,
          gzjlList,
          gzyjList,
          yxzymcList
        } = res.data;
        console.log('this.$refs.personalForm:',this.$refs.personalForm);
        this.$refs.personalForm.clearValidate();
        // 表单回显
        tpzjjb.shengri = tpzjjb.shengristr;
        tpzjjb.gzbegintime = tpzjjb.gzbegintimestr;
        this.personalForm = tpzjjb;
        // 审核状态
        this.shzt = tpzjjb.shzt;
        // 省市回显
        const {
          sfcode
        } = tpzjjb;
        if (sfcode) {
          this.getRegionList(sfcode)
        }
        // 申报专业回显
        this.yxzymcListData = yxzymcList;
        this.checkedSpecialityList = yxzymcList;
        this.checkedKeys = yxzymcList.map(item => {
          return item.zyflpkid;
        });
        this.$set(this.personalForm, 'zyids', this.checkedKeys.join(','));
        // 附件回显，转数组
        // 添加name
        Object.keys(fileListDto).forEach(fileKey => {
          if (!fileListDto[fileKey]) {
            fileListDto[fileKey] = [];
          }else if (!Array.isArray(fileListDto[fileKey])) {
            fileListDto[fileKey].name = fileListDto[fileKey].filename;
            fileListDto[fileKey] = [fileListDto[fileKey]]
          } else {
            fileListDto[fileKey].forEach(file => {
              file.name = file.filename
            })
          }
        });
        this.filesData = fileListDto;
        // 学习简历 工作简历 业绩
        this.learnInfoArr = xlxxList;
        this.workInfoArr = gzjlList;
        this.performanceInfoArr = gzyjList;
      }).catch(rej => {
        if (rej.header && rej.header.ret === 1) {
          this.$message({
            type: "error",
            showClose: true,
            message: rej.header.msg
          });
        } else {
          console.log(rej)
        }
      });
    },
    onPreviewFile(file) {
      // const {
      //   fileid,
      //   filename
      // } = file;
      // zb2DownloadFileitem.bind(this)({
      //   fileguid: fileid
      // }, filename).then(res => {
      //   this.$message({
      //     type: "success",
      //     showClose: true,
      //     message: '下载成功'
      //   });
      // }).catch(rej => {
      //   if (rej.header && rej.header.ret === 1) {
      //     this.$message({
      //       type: "error",
      //       showClose: true,
      //       message: rej.header.msg
      //     });
      //   } else {
      //     console.log(rej)
      //   }
      // })
    },
    onChangeFile(file, fileList, type) {
      const {
        size
      } = file;
      if (size > 5*1024*1024) {
        this.$message.warning('上传文件大小不得大于5M');
        fileList.pop();
        return;
      }
      const lowerType = type.toLowerCase();
      if (lowerType === 'qtfjfile') {
        // expertFormData.append(lowerType, raw);
        if (this.personalForm[lowerType] && Array.isArray(this.personalForm[lowerType])) {
          this.personalForm[lowerType].push(file);
        } else {
          this.personalForm[lowerType] = [file];
        }
      } else {
        // expertFormData.set(lowerType, raw);
        this.personalForm[lowerType] = [file];
      }
    },
    onFileExceed(files, fileList, type) {
      this.$refs[type].clearFiles();
      this.$nextTick(() => {
        this.$refs[type].handleStart(files[0])
      })
    },
    onProvinceChange(val) {
      this.cityData = [];
      this.personalForm.cscode = '';
      if (val) {
        this.getRegionList(val)
      }
    },
    // 获取省
    getRegionList(code) {
      const params = {};
      if (code) {
        params.parentcode = code
      } else {
        params.level = '2'
      }
      selectRegionListByCode.bind(this)(params).then(res => {
        if (code) {
          this.cityData = res.data;
        } else {
          this.provinceData = res.data;
        }
      }).catch(rej => {
        if (rej.header && rej.header.ret === 1) {
          this.$message({
            type: "error",
            showClose: true,
            message: rej.header.msg
          });
        } else {
          console.log(rej)
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.expert-personal {
  display: flex;
  justify-content: center;
}
.personal-wrapper {
  width: 1110px;
}
.personal-top {
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
}
.info-top {
  display: flex;
  height: 30px;
  align-items: center;
  padding-left: 36px;
  background: #fcfcfc;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: 1px solid rgb(233, 233, 233);
  .info-top-text {
    padding-left: 10px;
    font-size: 14px;
    border-left: 5px solid #005BAC;
  }
}
.info-main {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.info-wrapper {
  border: 1px solid rgb(233, 233, 233);
  border-radius: 6px;
  margin-bottom: 20px;
}
.expert-edit-wrapper {
  padding: 15px 20px;
  background: #fafafa;
}
.expert-edit-operate {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}
.personal-bottom {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 30px;
}
.expert-other-annex {
  padding: 15px 0 0;
  border-top: 1px solid #dddddd66;
}
.file-tip {
  color: rgb(0, 153, 255);
  font-size: 12px;
  margin-left: 190px;
  margin-bottom: 6px;
}
</style>
<style lang="scss">

.bidexpert-file-no-delete {
  .el-icon-close {
    display: none!important;
  }
  .el-icon-close-tip {
    display: none!important;
  }
}
</style>
