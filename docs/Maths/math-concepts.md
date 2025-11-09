# 一些数学概念
> 许多内容参考自[https://cto.eguidedog.net/node/1390](https://cto.eguidedog.net/node/1390)
## 哈密顿算子、梯度、散度、旋度、拉普拉斯算子
哈密顿算子是一个矢性微分算子，在运算中既有微分又有矢量的双重运算性质，其优点在于可以把对矢量函数的微分运算转变为矢量代数的运算，从而可以简化运算过程，并且推导简明扼要，易于掌握

$$
\nabla
=\frac{\partial}{\partial x}\vec{i}
+\frac{\partial}{\partial y}\vec{j}
+\frac{\partial}{\partial z}\vec{k}
$$


设向量场 $\vec{F}=P(x,y,z)\vec{i}+Q(x,y,z)\vec{j}+R(x,y,z)\vec{k}$ ，其中 $P、Q、R$ 是标量函数， $\vec{i}、\vec{j}、\vec{k}$ 分别是 $x、y、z$ 方向的单位向量，它有以下运算规则:

$$
\begin{cases}
    \text{grad}(u)
    &=\nabla u
    =\frac{\partial u}{\partial x}\vec{i}
    +\frac{\partial u}{\partial y}\vec{j}
    +\frac{\partial u}{\partial z}\vec{k} \\
    \text{div}(\vec{A})
    &=\nabla \cdot \vec{A}
    =\frac{\partial A_x}{\partial x}
    +\frac{\partial A_y}{\partial y}
    +\frac{\partial A_z}{\partial z} \\
    \text{rot}(\vec{A})
    &=\nabla \times u
    =(\frac{\partial A_z}{\partial y}-\frac{\partial A_y}{\partial z})\vec{i}
    +(\frac{\partial A_x}{\partial z}-\frac{\partial A_z}{\partial x})\vec{j}
    +(\frac{\partial A_y}{\partial x}-\frac{\partial A_x}{\partial y})\vec{k} \\
    \Delta
    &=\nabla \cdot \nabla
    =\nabla^2
\end{cases}
$$

> 注意： $\nabla \cdot \vec{A}$ 与 $\vec{A} \cdot \nabla$ 是不同的，前者表示一个散度（标量），后者表示微分算子


### 偏微分和梯度

| 名称 | 符号 | 例子 |
|------|-----| ----- |
| 导数 | $\frac{d}{dx}$ | $\frac{d}{dx}(x^2)=2x$ |
| 偏导数 | $\frac{\partial}{\partial x}$ | $\frac{\partial}{\partial x}(x^2-xy)=2x-y$ |
| 梯度 | $\nabla$ | $\nabla(x^2-xy)=[2x-y,-x]^\text{T}$ |

### 散度
大于0时表示向外流出，小于0时表示向内流进。散度值等于各方向偏导相加。

### 旋度
- 二维的旋度输入是一个矢量，输出是一个标量。逆时针为正，顺时针为负。值的大小表示旋转速度（弧度/秒）。
- 三维的旋度是一个矢量。三维旋度的方向是右手定则拇指指向方向，大小（行列式）表示旋转速度的两倍（因为它是值上下两个方向旋转速度相加的结果）。

### 拉普拉斯算子
- 拉普拉斯算子是f对各坐标分量的二次导数相加。山谷大于0，山峰小于0。其它地方的值含义暂不清楚。

### 调和函数
拉普拉斯算子恒为0的函数。一种没有山峰或山谷的函数。例如一维函数中的线性函数。

### 雅可比矩阵
用于坐标变换。对于二维雅可比行列式，其值可以认为是图形在坐标系转换后面积的变化比例。

- **二维情况** ：在平面直角坐标系中，设 $x=x(u,v)$ 和 $y=y(u,v)$ 是从 $(u,v)$ 平面到 $(x,y)$ 平面的坐标变换。则雅可比行列式:

$$
J
=\frac{\partial(x,y)}{\partial(u,v)}
=\begin{vmatrix} 
\frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} \\\ 
\frac{\partial y}{\partial u} & \frac{\partial y}{\partial v}
\end{vmatrix}
$$ 

- 它的绝对值 $|J|$ 用于在二重积分的坐标变换中计算面积元素的缩放比例。例如，从直角坐标 $(x,y)$ 变换到极坐标 $(r,\theta)$ ， $x=r\cos{\theta}$ ， $y=r\sin{\theta}$ ，则雅可比行列式:

$$
J
=\frac{\partial(x,y)}{\partial(r,\theta)}
=\begin{vmatrix} 
\cos{\theta} & -r\sin{\theta} \\\
\sin{\theta} & r\cos{\theta}
\end{vmatrix}
=r
$$ 

- 在计算二重积分 $\iint_D f(x,y)dxdy$ 变换到极坐标下的积分 $\iint_{D' } f(r\cos{\theta},r\sin{\theta})rdrd\theta$ 时， $r=|J|$ 就是面积元素的缩放因子。

- **三维情况**：对于从 $(u,v,w)$ 空间到 $(x,y,z)$ 空间的坐标变换 $x=x(u,v,w)，y=y(u,v,w)，z=z(u,v,w)$ ，则雅可比行列式:

$$
J
=\frac{\partial(x,y,z)}{\partial(u,v,w)}
=\begin{vmatrix} 
\frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} & \frac{\partial x}{\partial w} \\\
\frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} & \frac{\partial x}{\partial w} \\\
\frac{\partial z}{\partial u} & \frac{\partial z}{\partial v} & \frac{\partial z}{\partial w}
\end{vmatrix}
$$

- 在三重积分的坐标变换中， $|J|$ 表示体积元素的缩放比例。例如，从直角坐标 $(x,y,z)$ 变换到球坐标 $(\rho,\varphi,\theta)$ ， $x=\rho\sin{\varphi}\cos{\theta}$ ， $y=\rho\sin{\varphi}\sin{\theta}$ ， $z=\rho\cos{\varphi}$，则雅可比行列式： $J=\rho^2\sin{\varphi}$ 
- 在计算三重积分 $\iiint_V f(x,y,z)dxdydz$ 变换到极坐标下的积分 $\iiint_{V' } f(\rho\sin{\varphi}\cos{\theta},\rho\sin{\varphi}\sin{\theta},\rho\cos{\varphi})\rho^2\sin{\varphi}d\rho d\varphi d\theta$ 时， $\rho^2\sin{\varphi}=|J|$ 就是体积元素的缩放因子。

### 海森矩阵

$$
\mathbf{H}_f=
\begin{bmatrix}
\frac{\partial^2f}{\partial x^2} & \frac{\partial^2f}{\partial x \partial y} & \frac{\partial^2f}{\partial x \partial z} & \cdots \\
\frac{\partial^2f}{\partial y \partial x} & \frac{\partial^2f}{\partial y^2} & \frac{\partial^2f}{\partial y \partial z} & \cdots \\
\frac{\partial^2f}{\partial z \partial x} & \frac{\partial^2f}{\partial z \partial y} & \frac{\partial^2f}{\partial z^2} & \cdots \\
\vdots & \vdots & \vdots & \ddots
\end{bmatrix}
$$

二次近似：

$$
Q_{f}(\mathbf{x})
=\underbrace{f\left(\mathbf{x}_{0}\right)}_{\text {Constant }}
+\underbrace{\nabla f\left(\mathbf{x}_{0}\right) \cdot\left(\mathbf{x}-\mathbf{x}_{0}\right)}_{\text {Linear term }}
+\underbrace{\frac{1}{2}\left(\mathbf{x}-\mathbf{x}_{0}\right)^{\mathrm{T}} \mathbf{H}_{f}\left(\mathbf{x}_{0}\right)\left(\mathbf{x}-\mathbf{x}_{0}\right)}_{\text {Quadratic term }}
$$

## 场论
### 向量场
 $\mathbf{e}_i$ 是 $\mathbb{R}^n$ 中的第i个标准基向量。

如果 $u$， $v$ 都是定义在区域 $\Omega \subset \mathbb{R}^n$ 的标量函数，那么：

$$
G(x_1,x_2,\cdots,x_n)=u(x_1,x_2,\cdots,x_n)v(x_1,x_2,\cdots,x_n)\mathbf{e_i}
$$

是一个向量场，因为它的值是一个n维向量。具体来说，它的第 $i$ 个分量是 $uv$ ，其他分量都是0，即：

$$
G=(0,\cdots,0,\underbrace{uv}_\text{第i项},0,\cdots,0)
$$

在n维空间中，向量场 $G=(G_1,G_2,\cdots,G_n)$ 的散度为：

$$
\nabla \cdot G
    =\frac{\partial G_1}{\partial x_1}
    +\frac{\partial G_2}{\partial x_2}
    +\cdots
    +\frac{\partial G_n}{\partial x_n} 
$$

对于我们这个特殊向量场 $G=uv\mathbf{e}_i$ ，只有第 $i$ 个分量 $G_i=uv$ 非零，则：

$$
\nabla \cdot G
    =\frac{\partial (uv)}{\partial x_i}
$$


### 梯度场
梯度场（Gradient Field）是由数量场得到的矢量场。

具体来说，如果一个多变量函数 $f(x_1,x_2,...,x_n)$ 在每个点上都有定义，并且其偏导数存在，那么该函数的梯度 $\nabla f$ 就是一个矢量场，即梯度场。梯度场中的每个矢量都指向函数值增长最快的方向，其大小为该方向上的方向导数的最大值。

此外，梯度场的一个重要性质是其线积分与积分路径无关，只与始末位置在势函数中的值有关。这一性质类比重力场和电场，使得梯度场在物理学、工程学等领域有着广泛的应用。例如，在物理学中，梯度常用于描述电场、磁场、温度场等的分布和变化；在工程学中，梯度则可能用于优化问题，如寻找函数的最值点。

### 保守矢量场（Conservative Vector Field）
保守矢量场路径无关、无旋。

如果重力场不是保守矢量场就会出现下图的情况：
![alt text](image.png)

### Simple, Closed, Piecewise-smooth, Connected
A curve is simple if it never crosses itself, closed if it starts and ends in the same place, and piecewise-smooth if can be broken up into a finite number of smooth parts. (Smooth means differentiable.)

A region is simply connected if it never intersects itself and it has no holes.


### 格林定理（Green's Theorem）
设闭区域 $D$ 由分段光滑的简单闭曲线 $L$ 围成，函数 $P(x,y)$ 及 $Q(x,y)$ 在 $D$ 上具有一阶连续偏导数，则有：

$$
\iint_{D}(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y})dxdy
=\oint_L Pdx+Qdy
$$

其中， $L$ 是 $D$ 的取正向的边界曲线，这里的正向是指：当观察者沿边界行走时，区域D始终位于他的左侧。

换句话说，格林定理指出旋度（公式里的区域积分部分就是旋度公式）等于对区域边界做线积分，这是非常符合旋度物理意义的直觉的。

作为对比，下面是散度定理：

$$
\oint_C Pdy-Qdx=\iint_R(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y})dA
$$

### 斯托克斯定理（Stokes' theorem）
#### 定理内容
斯托克斯定理建立了向量场的旋度在一个曲面S上的面积分与该向量场在曲面S的边界曲线C上的线积分之间的关系，它表明向量场沿闭曲线C的环量等于该向量场的旋度在以C为边界的曲面S上的通量。直观地说，就是曲面边界上的某种“流动”情况与曲面上的“旋转”情况存在着特定的等量关系。
#### 数学表达式
设 $\vec{F}(x,y,x)$ 是一个向量场， $S$ 是一个有向曲面，其边界为闭曲线 $C$，曲线 $C$ 的方向与曲面 $S$ 的法向量遵循右手定则，则斯托克斯定理的数学表达式为：

$$
\int_C \vec{F}\cdot d\vec{r}=\iint_S(\nabla \times \vec{F})\cdot d\vec{S}
$$

其中， $\int_C \vec{F}\cdot d\vec{r}$ 是向量场 $\vec{F}$ 沿曲线 $C$ 的线积分， $\iint_S(\nabla \times \vec{F})\cdot d\vec{S}$ 是向量场 $\vec{F}$ 的旋度 $\nabla \times \vec{F}$ 在曲面 $S$ 上的面积分， $\nabla \times \vec{F}$ 表示向量场 $\vec{F}$ 的旋度。
- Green theorem：主要应用于二维平面区域，处理平面上的曲线积分和二重积分之间的转换问题，例如在计算平面向量场沿闭曲线的环量以及平面区域上的通量等问题中经常用到。
- Stokes' theorem：应用于三维空间，用于处理三维向量场中曲面的面积分与边界曲线的线积分之间的关系，在分析三维空间中的电磁学问题、流体涡旋等方面有广泛应用。
- Green theorem：从几何上看，它可以理解为平面区域 $D$ 上的某种“净流量”（由 $\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}$ 表示）与沿着区域 $D$ 的边界曲线 $L$ 的 “流量” 之间的关系。
- Stokes' theorem: 其几何意义是向量场沿闭曲线 $C$ 的环量等于该向量场的旋度在以 $C$ 为边界的曲面 $S$ 上的通量，直观地体现了曲面上的 “旋转” 情况与边界曲线的 “环量” 之间的联系。

### 散度定理（divergence theorem）
也称为高斯定理（Gauss's theorem）或高斯 - 奥斯特罗格拉德斯基定理（Gauss - Ostrogradsky theorem），是向量微积分中的一个重要定理，它建立了向量场通过闭曲面的通量与该向量场的散度在闭曲面所包围的空间区域上的体积分之间的联系。

设 $\vec{F}(x,y,x)$ 是一个定义在三维空间中具有一阶连续偏导数的向量场，$V$是由分段光滑的闭曲面$S$所围成的有界闭区域， $S$ 的方向取外侧（即法向量指向区域 $V$ 的外部）。则散度定理可以表述为：

$$
\iint_S \vec{F}\cdot d\vec{S}=\iiint_V \text{div}\vec{F}dv
$$

其中：
- $\iint_S \vec{F}\cdot d\vec{S}$ 是向量场 $\vec{F}$ 通过闭曲面 $S$ 的通量。她表示向量场 $\vec{F}$ 穿过曲面 $S$ 的流量大小， $d\vec{S}$ 是曲面 $S$ 的面积微元向量，其方向为曲面 $S$ 在该点的外法向量方向。
- $\iiint_V \text{div}\vec{F}dv$ 是向量场 $\vec{F}$ 的散度 $\text{div}\vec{F}$ 在区域 $V$ 上的体积分。 $\text{div}\vec{F}=\frac{\partial F_x}{\partial x}+\frac{\partial F_y}{\partial y}+\frac{\partial F_z}{\partial z}$ ，其中 $\vec{F}=F_x\vec{i}+F_y\vec{j}+F_z\vec{k}$ 。

## 极值判断方法
The second partial derivative test uses the quantity below, evaluated at the critical point we wish to classify.

$$
H=f_{xx}f_{yy}-f_{xy}f_{yx}
$$

- $H<0$ implies a saddle point.
- $H>0$ and $f_{xx}>0$ implies a local minimum.
- $H>0$ and $f_{xx}<0$ implies a local maximum.
- $H=0$ means the test is inconclusive.


## 变分法
### 高维分部积分公式
令向量场 $F=u\cdot \nabla v$ ，有高维分部积分公式：

$$
\int_\Omega u\Delta v dV=\int_{\partial{\Omega}}u\frac{\partial{v}}{\partial{n}}dS-\int_\Omega \nabla u \nabla v dV
$$

#### 推导过程
取向量场 $G=(G_1,G_2,\cdots,G_n)=uv\mathbf{e}_i$ ，其中 $\mathbf{e}_i$ 为第i个标准基向量，即沿着 $x_i$ 方向的单位向量，那么：

$$
\begin{align*}
\nabla \cdot G 
&= \nabla \cdot (uv\mathbf{e}_i) \\
&= \frac{\partial G_1}{\partial x_1}
    +\frac{\partial G_2}{\partial x_2}
    +\cdots
    +\frac{\partial G_n}{\partial x_n} \\
&= \frac{\partial (uv)}{\partial x_i} &\qquad ,(只有第 i 个分量 G_i=uv 非零) \\
&= u\frac{\partial v}{\partial x_i} + v\frac{\partial u}{\partial x_i} &\qquad ,(乘法法则： (uv)'=u'v+uv')
\end{align*}
$$

代入散度定理 $\int_\Omega \nabla \cdot G dx=\int_{\partial \Omega} G \cdot \mathbf{n} dS$ ，有：

$$
\int_\Omega \nabla \cdot G dx
=\int_\Omega u\frac{\partial v}{\partial x_i} + v\frac{\partial u}{\partial x_i} dx
=\int_{\partial \Omega} uv\mathbf{e}_i \cdot \mathbf{n} dS
=\int_{\partial \Omega} uv n_i dS
$$

整理得到最终公式：

$$
\int_\Omega u\frac{\partial v}{\partial x_i} dx
=\int_{\partial \Omega} uv n_i dS
-\int_\Omega v\frac{\partial u}{\partial x_i} dx
$$

若把分量求和用向量记号表示（令 $F$ 为任意光滑向量场），对 $F$ 上的每个分量重复上面推导并相加，得到：

$$
\int_\Omega u(\nabla \cdot F)dx
=\int_{\partial \Omega} u (F \cdot \mathbf{n}) dS 
-\int_\Omega (\nabla u) \cdot Fdx
$$

代入 $F=\nabla v$，注意 $\nabla \cdot (\nabla v)=\Delta v$ ，并使边界项变为 $F\cdot \mathbf{n} = \frac{\partial v}{\partial n}$ ，得到Laplace形式：

$$
\int_\Omega u \nabla v dx
=\int_{\partial \Omega} u\frac{\partial v}{\partial n} dS
-\int_\Omega \nabla u \nabla v dx
$$

### 变分法
在普通微积分中：
- 如果要让一个函数 $f(x)$ 最小，就解方程 $f'(x)=0$ ，得到对应的 $x$

在泛函分析/变分法中：
- 如果要让一个泛函（如Dirichlet能量 $E(u)$ ）最小，就要求它的变分为0：

$$
\delta E(u)=0
$$

> 即找到能让 $E(u)$ 最小的函数 $u$

#### 推导
假如在 $u(x,y)$ 的基础上加一个很小的扰动：

$$
u_\epsilon(x,y)=u(x,y)+\epsilon v(x,y)
$$

其中：
- $\epsilon$ 是一个很小的数
- $v(x,y)$ 是任意一个“扰动函数”，但边界条件满足 $v|_{\partial \Omega}=0$ (边界固定)

代入能量：

$$
\begin{align*}
E(u_\epsilon)
&=\frac{1}{2}\int_\Omega(|\nabla (u+\epsilon v)|)^2dxdy \\
&=\frac{1}{2}\int_\Omega(|\nabla u|^2+2\epsilon \nabla u \cdot \nabla v + \epsilon^2 |\nabla v|^2)dxdy
\end{align*}
$$

对 $\epsilon$ 求导，取 $\epsilon=0$ ：

$$
\frac{dE(u_\epsilon)}{d\epsilon}|_{\epsilon=0}=\int_\Omega \nabla u \cdot \nabla v dxdy
$$

为了使 $E(u)$ 最小，必须对所有扰动 $v$ 都有：

$$
\delta E(u)=0 \rightarrow \int_\Omega \nabla u \cdot \nabla v dxdy=0
$$

分部积分有：

$$
\int_\Omega \nabla u \cdot \nabla v dxdy
= -\int_\Omega (\Delta u)v dxdy
+\int_{\partial\Omega} v \frac{\partial u}{\partial n} ds
$$

由于假设 $v|_{\partial\Omega}=0$ ，所以边界项为0：

$$
\int_\Omega \nabla u \cdot \nabla v dxdy
= -\int_\Omega (\Delta u)v dxdy
$$

于是,对所有扰动 $v$ ：

$$
-\int_\Omega (\Delta u)v dxdy
=\int_\Omega \nabla u \cdot \nabla v dxdy
=0
$$

由于 $v$ 是任意扰动函数，所以上式只有在 $\Delta u=0$ 时才能成立。



### Dirichlet 能量
给定一个标量场 $u(x,y)$ ，例如一块橡皮薄膜的高度分布 $u$ ，定义在区域 $\Omega \subset \mathbb{R}^2$ 上，边界 $\partial \Omega$ 被固定住，中间的部分可以自由弯曲。如果橡皮膜很平滑（变化不剧烈），那么“能量”应该很小；如果橡皮膜起伏很大（变化剧烈），那么“能量”应该很大。

使用梯度来刻画橡皮膜表面的变化，它表示在每一点上，函数变化的快慢：

$$
\nabla u=(\frac{\partial u}{\partial x},\frac{\partial u}{\partial y})
$$

可以构造一个“总变化”的量，这个量就是Dirichlet能量：

$$
E(u)=\int_\Omega ||\nabla u||^2 dA
$$

在给定边界值的条件下，一个最小化的Dirichlet能量，意味着：

$$
\Delta u=0
$$

即：**Dirichlet能量最小->函数是调和的**

对于一个从曲面 $S$ 到平面 $D$ 的映射：

$$
f: S \rightarrow D , f=(u,v)
$$

则该映射的Dirichlet能量为：

$$
E(f)=\frac{1}{2}\int_S(|\nabla u|^2+|\nabla v|^2)dA
$$

几何意义：
- 若映射均匀光滑，则能量小；
- 若映射产生很大拉伸或压缩，则能量大
- 最小化Dirichlet能量常常能得到“光滑、无褶皱”的参数化

离散化形式
在离散网格曲面上，设每个顶点的函数值为 $u_i$ ，则离散Dirichlet能量写成：

$$
E(u)=\frac{1}{2}u^\mathrm{T}Lu
$$

> $L$ 是离散拉普拉斯矩阵

## 群论


## 张量
### 爱因斯坦求和约定
主要是为了简化某些求和表达式而出现的`简写标记`

$$
\begin{align*}
a_ib_i
&:=\sum_{i=1}^n a_ib_i\\
&=a_1b_1+a_2b_2+\cdots+a_nb_n
\end{align*}
$$

### 哑标和自由标
- 自由标：在一个表达式的单项中，只出现`1`次的指标
- 哑标：在一个表达式的单项中，只出现`2`次的指标

> 注意：单项中的指标，**最多出现2次**  ，哑标的个数=求和号的个数
>  $u_iv_{ii}$ ：这种就是错误的，因为出现了`3`次 $i$  
>  $\sigma_{ij,j}+f_i=0$ ：这个表达式中，单项是 $\sigma_{ij,j}$ 和 $f_i$ ，哑标为 $j$ ，自由标为 $i$

例子。假设 $i,j=1,2,3$ ：

$$
\begin{align*}
A_{ij}x_iy_j
&:=\sum_{i=1}^3 \sum_{j=1}^3 A_{ij}x_iy_j \\
&=\sum_{i=1}^3 (A_{i1}x_iy_1+A_{i2}x_iy_2+A_{i3}x_iy_3) \\
&= (A_{11}x_1y_1+A_{12}x_1y_2+A_{13}x_1y_3) \\
&+ (A_{21}x_2y_1+A_{22}x_2y_2+A_{23}x_2y_3) \\
&+ (A_{31}x_3y_1+A_{32}x_3y_2+A_{33}x_3y_3) \\
\end{align*}
$$

## 和乐性（holonomy）
https://zhuanlan.zhihu.com/p/107550968  
和乐性在量子力学中叫做几何相位，指某些变量（如矢量的方向）绕曲面上的一条闭合曲线作平行移动，回到原点后相比初始时发生的变化

![alt text](image-1.png)

如上图所示，矢量 $\vec{v}$ 在曲率为0的平面上绕闭合曲线平行移动一周方向不变。而在球面上矢量 $\vec{v}$ 绕闭合曲线平行移动（在这里，平行移动是指平移过程中矢量始终处于其经过的每点的切平面上，并且沿切平面法向的角动量分量为零）一周后方向改变，即与初始时相比存在偏差角。可以证明这个偏差角等于被闭合曲线包围曲面的高斯曲率的积分（Gauss-Bonnet theorem）。